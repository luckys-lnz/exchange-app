const BINANCE_P2P_API = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"

interface BinanceP2PRequest {
  fiat: string
  page: number
  rows: number
  tradeType: "BUY" | "SELL"
  asset: string
  countries: string[]
}

interface BinanceP2PResponse {
  data: Array<{
    adv: {
      price: string
      minSingleTransAmount: string
      maxSingleTransAmount: string
    }
  }>
}

export async function fetchBinanceP2PRate(fiat: string, tradeType: "BUY" | "SELL" = "BUY", asset = "USDT") {
  const payload: BinanceP2PRequest = {
    fiat,
    page: 1,
    rows: 10,
    tradeType,
    asset,
    countries: [],
  }

  try {
    const response = await fetch(BINANCE_P2P_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: BinanceP2PResponse = await response.json()

    // Calculate average of first 5 offers
    const prices = data.data.slice(0, 5).map((item) => Number.parseFloat(item.adv.price))

    const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length

    return averagePrice
  } catch (error) {
    console.error(`Error fetching ${fiat} rate:`, error)
    throw error
  }
}

