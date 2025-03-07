// Simulated exchange rates with small random fluctuations
export function getSimulatedRates() {
  // Base rates
  const baseNgnUsd = 0.00067 // 1 NGN ≈ 0.00067 USD
  const baseUsdGhs = 15.75 // 1 USD ≈ 12.35 GHS

  // Add small random fluctuations (±0.5%)
  const fluctuation = () => 1 + (Math.random() - 0.5) * 0.01

  const ngnToUsd = baseNgnUsd * fluctuation()
  const usdToGhs = baseUsdGhs * fluctuation()

  return {
    ngnToUsd,
    usdToGhs,
    timestamp: Date.now(),
  }
}

