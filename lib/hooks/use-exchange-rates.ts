"use client"

import { useState, useEffect, useCallback } from "react"

interface Rates {
  ngnToUsd: number
  usdToGhs: number
  timestamp: number
  isFallback?: boolean
  error?: string
}

interface RateHistory {
  rate: number
  timestamp: number
  isFallback: boolean
}

export function useExchangeRates() {
  const [rates, setRates] = useState<Rates>({
    ngnToUsd: 0.00067,
    usdToGhs: 12.35,
    timestamp: Date.now(),
    isFallback: true,
  })
  const [rateHistory, setRateHistory] = useState<RateHistory[]>([])
  const [lastUpdated, setLastUpdated] = useState(Date.now())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRIES = 3

  const getNgnToGhs = useCallback(() => {
    if (!rates.ngnToUsd || !rates.usdToGhs) return 0
    return rates.ngnToUsd * rates.usdToGhs
  }, [rates.ngnToUsd, rates.usdToGhs])

  const getGhsToNgn = useCallback(() => {
    if (!rates.ngnToUsd || !rates.usdToGhs) return 0
    return (1 / rates.usdToGhs) * (1 / rates.ngnToUsd)
  }, [rates.ngnToUsd, rates.usdToGhs])

  const fetchRates = useCallback(
    async (isRetry = false) => {
      try {
        setIsLoading(true)
        if (!isRetry) {
          setError(null)
          setRetryCount(0)
        }

        const response = await fetch("/api/exchange-rates", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store", // Disable caching to always get fresh rates
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Handle API error with fallback
        if (data.error) {
          console.warn("API returned error:", data.error)
          setError(data.error)

          // Retry logic
          if (!data.isFallback && retryCount < MAX_RETRIES) {
            setRetryCount((prev) => prev + 1)
            setTimeout(() => fetchRates(true), 1000 * (retryCount + 1))
            return
          }
        }

        setRates(data)
        setLastUpdated(Date.now())

        setRateHistory((prev) => {
          const newRate = data.ngnToUsd * data.usdToGhs
          const newHistory = [
            ...prev,
            {
              rate: newRate,
              timestamp: Date.now(),
              isFallback: !!data.isFallback,
            },
          ]
          // Keep last 20 data points
          return newHistory.slice(-20)
        })
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error)
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch rates"
        setError(errorMessage)

        // Retry logic for unexpected errors
        if (retryCount < MAX_RETRIES) {
          setRetryCount((prev) => prev + 1)
          setTimeout(() => fetchRates(true), 1000 * (retryCount + 1))
        }
      } finally {
        setIsLoading(false)
      }
    },
    [retryCount],
  )

  useEffect(() => {
    fetchRates()
    // Update rates every 30 seconds
    const interval = setInterval(() => fetchRates(), 30000)
    return () => clearInterval(interval)
  }, [fetchRates])

  return {
    rates,
    getNgnToGhs,
    getGhsToNgn,
    rateHistory,
    lastUpdated,
    isLoading,
    error,
    refresh: () => fetchRates(),
    isFallback: rates.isFallback,
  }
}

