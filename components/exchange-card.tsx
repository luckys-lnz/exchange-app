"use client"

import { useState } from "react"
import { ArrowLeftRight, Loader2, RefreshCcw, TrendingDown, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useExchangeRates } from "@/lib/hooks/use-exchange-rates"
import { cn } from "@/lib/utils"

export function ExchangeCard() {
  const [amount, setAmount] = useState<string>("1000")
  const [isReversed, setIsReversed] = useState(false)
  const { rates, getNgnToGhs, getGhsToNgn, lastUpdated, isLoading, refresh } = useExchangeRates()

  const handleSwitch = () => {
    setIsReversed(!isReversed)
    setAmount((prev) => {
      const numAmount = Number.parseFloat(prev)
      if (isNaN(numAmount)) return prev
      return (numAmount * (isReversed ? getNgnToGhs() : getGhsToNgn())).toFixed(2)
    })
  }

  const convertedAmount = () => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount)) return "0.00"
    return (numAmount * (isReversed ? getGhsToNgn() : getNgnToGhs())).toFixed(2)
  }

  const formatNumber = (num: string) => {
    return Number(num).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }

  // Simulated rate change for demo (replace with actual rate comparison)
  const rateChange = 0.05 // 0.05%
  const RateChangeIcon = rateChange >= 0 ? TrendingUp : TrendingDown
  const rateChangeColor = rateChange >= 0 ? "text-green-500" : "text-red-500"

  return (
    <Card className="backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Currency Converter</CardTitle>
          <Button variant="ghost" size="icon" onClick={refresh} disabled={isLoading}>
            <RefreshCcw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <p>
              1 {isReversed ? "GHS" : "NGN"} ={" "}
              {isReversed ? formatNumber(getGhsToNgn().toFixed(4)) : formatNumber(getNgnToGhs().toFixed(4))}{" "}
              {isReversed ? "NGN" : "GHS"}
            </p>
            <RateChangeIcon className={cn("h-4 w-4", rateChangeColor)} />
            <span className={rateChangeColor}>{Math.abs(rateChange)}%</span>
          </div>
          <p className="text-xs">Updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">{isReversed ? "GHS" : "NGN"} Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <Button variant="outline" size="icon" className="mx-auto h-8 w-8 rounded-full p-0" onClick={handleSwitch}>
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          <div className="grid gap-2">
            <label className="text-sm font-medium">{isReversed ? "NGN" : "GHS"} Amount</label>
            <div className="relative">
              <Input readOnly value={formatNumber(convertedAmount())} />
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

