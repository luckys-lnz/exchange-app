"use client"

import { ArrowDown, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useExchangeRates } from "@/lib/hooks/use-exchange-rates"

export function RateBreakdown() {
  const { rates, getNgnToGhs, getGhsToNgn, lastUpdated, isLoading, error, isFallback } = useExchangeRates()

  const formatRate = (rate: number | null, decimals = 4) => {
    if (rate === null || isNaN(rate)) return "-"
    return rate.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Loading rates...</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {(error || isFallback) && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || "Using fallback rates. Real-time rates unavailable."}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">NGN → GHS Conversion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium">Step 1: NGN to USD</p>
            <p className="text-2xl font-bold">1 USD = {formatRate(rates?.ngnToUsd ? 1 / rates.ngnToUsd : null)} NGN</p>
            <p className="text-sm text-muted-foreground">Rate: {formatRate(rates?.ngnToUsd, 6)} USD per NGN</p>
          </div>
          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium">Step 2: USD to GHS</p>
            <p className="text-2xl font-bold">1 USD = {formatRate(rates.usdToGhs)} GHS</p>
            <p className="text-sm text-muted-foreground">Rate: {formatRate(rates.usdToGhs, 4)} GHS per USD</p>
          </div>
          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="mb-2 text-sm font-medium">Final Rate</p>
            <p className="text-2xl font-bold">1 NGN = {formatRate(getNgnToGhs())} GHS</p>
            <p className="text-sm text-muted-foreground">Updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">GHS → NGN Conversion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium">Step 1: GHS to USD</p>
            <p className="text-2xl font-bold">1 USD = {formatRate(rates.usdToGhs)} GHS</p>
            <p className="text-sm text-muted-foreground">Rate: {formatRate(1 / rates.usdToGhs, 6)} USD per GHS</p>
          </div>
          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium">Step 2: USD to NGN</p>
            <p className="text-2xl font-bold">1 USD = {formatRate(1 / rates.ngnToUsd)} NGN</p>
            <p className="text-sm text-muted-foreground">Rate: {formatRate(1 / rates.ngnToUsd, 4)} NGN per USD</p>
          </div>
          <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="mb-2 text-sm font-medium">Final Rate</p>
            <p className="text-2xl font-bold">1 GHS = {formatRate(getGhsToNgn())} NGN</p>
            <p className="text-sm text-muted-foreground">Updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

