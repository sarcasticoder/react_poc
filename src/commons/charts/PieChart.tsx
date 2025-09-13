"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "./chart"

export const description = "A pie chart with a legend"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#3b82f6", // Blue
  },
  safari: {
    label: "Safari",
    color: "#10b981", // Green
  },
  firefox: {
    label: "Firefox",
    color: "#8b5cf6", // Purple
  },
  edge: {
    label: "Edge",
    color: "#f59e0b", // Orange
  },
  other: {
    label: "Other",
    color: "#ef4444", // Red
  },
} satisfies ChartConfig

export default function ChartPieLegend() {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">Pie Chart - Legend</h3>
        <p className="text-sm text-muted-foreground">
          January - June 2024
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-80 h-80"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={(props) => <ChartLegendContent payload={props.payload} verticalAlign={props.verticalAlign} nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  )
}