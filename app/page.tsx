import { ExchangeCard } from "@/components/exchange-card"
import { RateHistory } from "@/components/rate-history"
import { RateBreakdown } from "@/components/rate-breakdown"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen bg-gradient-to-b from-background to-background/80 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="text-xl font-bold">Lnz_fx</span>
            </div>
            <ThemeToggle />
          </nav>

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">NGN ⇄ GHS Exchange</h1>
            <p className="text-muted-foreground">Real-time Binance P2P Exchange Rates</p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-8">
              <ExchangeCard />
              <RateHistory />
            </div>
            <RateBreakdown />
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}

