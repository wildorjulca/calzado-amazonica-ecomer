// 'use client'

import { KpiCard } from '@/components/ui/core/kpi-card'
import { getOrders } from '@/src/actions/admin/order'
import { SalesByPaymentChart } from '@/src/components/dashboard/chart/TopProductosChart'

import { ChartVentasMensuales } from '@/src/components/dashboard/chart/ventas-mensuales-chart'
import { PieChart, User, Users, DollarSign } from 'lucide-react'
import Datatable from './orders/data-table'
import { columns } from './orders/columns'
import { Card } from '@/components/ui/card'
import { getAllDashboardStats } from '@/src/actions/admin/dashboard'
import IsEmpty from '@/src/components/dashboard/IsEmpty'

const DashboardPage = async () => {

  const { countUser } = await getAllDashboardStats()
  const response = await getOrders()

  return (
    <div className="p-6">
      <h4 className="scroll-m-20 text-2xl tracking-tight font-semibold">
        Hola, bienvenido de nuevo 👋
      </h4>

      {/* Primer módulo de KPIs */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-4">
          <KpiCard
            className="rounded-none w-[300px]"
            label="Ventas Hoy"
            value={`S/ ${60139}`}
            delta={150}
            trend="up"
            caption="vs Previous 30 Days"
            tone="primary"
            icon={<PieChart className="h-4 w-4 text-blue-600 dark:text-blue-300" />}
          />
          <KpiCard
            className="rounded-none w-[300px]"
            label="Total Clientes"
            value={countUser}
            trend="flat"
            tone="default"
            icon={<Users className="h-5 w-5 text-green-600 dark:text-green-300" />}
          />

          <KpiCard
            className="rounded-none w-[300px]"
            label="Ganancias Totales"
            value={`S/ ${120000}`}
            trend="up"
            delta={20}
            tone="default"
            icon={<DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />}
          />
        </div>
      </div>
      {/* Modulod e charts */}
      <div className='mt-8'>
        <ChartVentasMensuales />
      </div>

      <div className='grid grid-cols-4 gap-8 mt-8'>
        <div className="col-span-3">
          <Card className='p-4'>
            <h4 className="scroll-m-20 text-2xl tracking-tight font-semibold">
              Pedidos, recientes ⚡
            </h4>

            {response.pedidos?.length === 0 ? (
              <IsEmpty />
            ) : (
              // <Datatable
              //   data={response.pedidos || []}
              //   columns={columns}
              //   globalFilterColumn="name"
              //   caption="List of users."
              // />
              <p>Datos del ordenes falta ponerlo</p>
            )}

          </Card>

          {/* </div> */}
        </div>
        <SalesByPaymentChart />
      </div>


    </div>
  )
}

export default DashboardPage