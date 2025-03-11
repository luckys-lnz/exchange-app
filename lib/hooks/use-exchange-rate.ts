"use client"

import { useState, useEffect } from "react"

export function useExchangeRate() {
  const [rate, setRate] = useState(0.045) // Example rate NGN to GHS
  const [lastUpdated, setLastUpdated] = useState(Date.now())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setIsLoading(true)
        // To be replace with actual Binance P2P API call
        const response = await fetch("/api/exchange-rate")
        const data = await response.json()
        setRate(data.rate)
        setLastUpdated(Date.now())
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchRate()

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchRate, 30000)

    return () => clearInterval(interval)
  }, [])

  return { rate, lastUpdated, isLoading }
}

