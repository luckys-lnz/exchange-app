"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useExchangeRates } from "@/lib/hooks/use-exchange-rates"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function RateHistory() {
  const { rateHistory } = useExchangeRates()
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [])

  const data = {
    labels: rateHistory.map((r) => new Date(r.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "NGN to GHS Rate",
        data: rateHistory.map((r) => r.rate),
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          color: "hsl(var(--border) / 0.1)",
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate History</CardTitle>
        <CardDescription>Exchange rate fluctuations over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

