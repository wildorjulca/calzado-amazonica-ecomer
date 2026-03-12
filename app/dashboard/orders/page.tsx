import { getOrders } from "@/src/actions/admin/order"
import { columns, Order } from "./columns"
import Datatable from "./data-table"
import DataTable from "./data-table"
// import { DataTable } from "./data-table"

async function getData(): Promise<Order[]> {
  return [
    {
      id: "ORD-001",
      amount: 250,
      status: "pending",
      email: "juan@email.com",
    },
    {
      id: "ORD-002",
      amount: 480,
      status: "processing",
      email: "maria@email.com",
    },
    {
      id: "ORD-003",
      amount: 120,
      status: "success",
      email: "carlos@email.com",
    },
    {
      id: "ORD-004",
      amount: 990,
      status: "failed",
      email: "ana@email.com",
    },
    {
      id: "ORD-005",
      amount: 320,
      status: "success",
      email: "cliente@email.com",
    },
  ]
}

export default async function OrdersPage() {
  // const data = await getData()

  const response = await getOrders()

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center text-red-500">
        {response.message}
      </div>
    )
  }



  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-medium">Pedidos</h1>
      <Datatable
        data={response.pedidos}
        columns={columns}
        globalFilterColumn="name"
        caption="List of users."
      />
      {/* </div> */}
    </div>
  )
}