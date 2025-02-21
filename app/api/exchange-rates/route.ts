import { NextResponse } from "next/server"
import { getSimulatedRates } from "@/lib/exchange-rates"

export async function GET() {
  try {
    // Get simulated rates
    const { ngnToUsd, usdToGhs, timestamp } = getSimulatedRates()

    // Validate rates
    if (!ngnToUsd || !usdToGhs || ngnToUsd <= 0 || usdToGhs <= 0) {
      throw new Error("Invalid rates calculated")
    }

    return NextResponse.json({
      ngnToUsd,
      usdToGhs,
      timestamp,
      isFallback: false,
    })
  } catch (error) {
    console.error("Error in exchange rates API:", error)

    // Return fallback rates
    return NextResponse.json({
      ngnToUsd: 0.00067,
      usdToGhs: 12.35,
      timestamp: Date.now(),
      isFallback: true,
      error: error instanceof Error ? error.message : "Failed to fetch rates",
    })
  }
}

