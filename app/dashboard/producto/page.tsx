import { getProducts } from '@/src/actions/admin/product'
import React from 'react'
import { DataTable } from './ui/data-table'
import { columns } from './ui/columns'

const page = async () => {

  const response = await getProducts()

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center text-red-500">
        {response.message}
      </div>
    )
  }

  const data = response.data ?? []


  return (
    <div>
      <h1 className='text-2xl'>Productos</h1>
      <div className='mt-8'>
        {/* <DataTable columns={columns} data={data} /> */}

      </div>
    </div>
  )
}

export default page