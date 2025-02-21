const BYBIT_API_URL = "https://api.bybit.com/v5/market/tickers"

interface BybitTickerResponse {
  retCode: number
  result: {
    list: Array<{
      symbol: string
      lastPrice: string
      bid1Price: string
      ask1Price: string
    }>
  }
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function fetchBybitRate(symbol: string) {
  try {
    const url = new URL(BYBIT_API_URL)
    url.searchParams.append("category", "spot")
    url.searchParams.append("symbol", symbol)

    console.log(`Fetching Bybit rate for ${symbol}...`)

    const response = await fetchWithTimeout(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-cache",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`)
    }

    const data: BybitTickerResponse = await response.json()
    console.log(`Bybit response for ${symbol}:`, data)

    if (data.retCode !== 0) {
      throw new Error(`Bybit API error: ${JSON.stringify(data)}`)
    }

    if (!data.result?.list?.[0]) {
      throw new Error(`No data found for ${symbol}`)
    }

    const ticker = data.result.list[0]
    const price = Number.parseFloat(ticker.lastPrice)

    if (isNaN(price) || price <= 0) {
      throw new Error(`Invalid price received for ${symbol}: ${ticker.lastPrice}`)
    }

    console.log(`Successfully fetched ${symbol} rate:`, price)
    return price
  } catch (error) {
    console.error(`Error fetching ${symbol} rate:`, error)
    return null
  }
}

export async function fetchNGNRate() {
  try {
    // For testing, let's try both NGNT and NGN pairs
    const symbols = ["NGNTUSDT", "NGNUSDT"]
    let rate = null

    for (const symbol of symbols) {
      rate = await fetchBybitRate(symbol)
      if (rate) break
    }

    if (!rate) {
      throw new Error("Failed to fetch NGN rate from all available pairs")
    }

    // Convert to USD rate (assuming USDT ≈ USD)
    return rate
  } catch (error) {
    console.error("Error calculating NGN rate:", error)
    return null
  }
}

export async function fetchGHSRate() {
  try {
    // Since GHS isn't directly available on Bybit, we'll use a simulated rate
    // In production, you should implement a call to a different API that supports GHS
    console.log("Using simulated GHS rate")
    return 12.35
  } catch (error) {
    console.error("Error fetching GHS rate:", error)
    return null
  }
}

