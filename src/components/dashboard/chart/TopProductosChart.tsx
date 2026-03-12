"use client"

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// 🔥 Datos simulados
const data = [
    { name: "Tarjeta", value: 18500 },
    { name: "Yape", value: 9200 },
    { name: "Plin", value: 5400 },
    { name: "Transferencia", value: 7600 },
    { name: "Contra entrega", value: 3100 },
]

export function SalesByPaymentChart() {
    const total = data.reduce((acc, item) => acc + item.value, 0)

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Ventas por Método de Pago</CardTitle>
                <CardDescription>
                    Distribución total del mes actual
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="relative h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                innerRadius={70}
                                paddingAngle={4}
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={`var(--chart-${(index % 5) + 1})`}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value: number) =>
                                    `S/ ${value.toLocaleString()}`
                                }
                            />

                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* 🔥 Total en el centro */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-sm text-muted-foreground">
                            Total Ventas
                        </span>
                        <span className="text-2xl font-bold">
                            S/ {total.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}