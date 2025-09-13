"use client"

import { TrendingUp } from "lucide-react"
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"

export const description = "A mixed chart with bars and line"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ef4444", // Red
  },
  mobile: {
    label: "Mobile",
    color: "#10b981", // Green
  },
} satisfies ChartConfig

export default function ChartMixedDefault() {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex flex-col gap-1 pb-4 mb-4 border-b">
        <h3 className="text-lg font-semibold">Mixed Chart</h3>
        <p className="text-sm text-muted-foreground">
          Combined bar and line chart visualization
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ComposedChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {/* Bar for desktop */}
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            {/* Line for mobile */}
            <Line
              dataKey="mobile"
              type="natural"
              stroke="var(--color-mobile)"
              strokeWidth={3}
              dot={{ fill: "var(--color-mobile)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "var(--color-mobile)", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col items-start gap-2 text-sm pt-4 border-t">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing combined desktop and mobile data for the last 6 months
        </div>
      </div>
    </div>
  )
}
