"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", ventas: 18600 },
  { month: "February", ventas: 30500 },
  { month: "March", ventas: 23700 },
  { month: "April", ventas: 7300 },
  { month: "May", ventas: 20900 },
  { month: "June", ventas: 21400 },
]

const chartConfig = {
  ventas: {
    label: "Ventas",
    // color: "var(--chart-1)",
  },
} satisfies ChartConfig


export function ChartVentasMensuales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas Totales por Mes</CardTitle>
        <CardDescription>Enero - Junio 2024</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full border h-[300px]">
          <ChartContainer config={chartConfig} style={{ height: 300, width: 1000}}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="ventas"
                fill="var(--chart-3)"
                radius={6}
              />
            </BarChart>
          </ChartContainer>
        </div>

      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Incremento del 8.4% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando ventas totales de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}