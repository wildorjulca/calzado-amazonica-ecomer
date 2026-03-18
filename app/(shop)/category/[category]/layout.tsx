import { getCategorizacionSidebar } from '@/src/actions/shop/getCategorizacionSidebar'
import SidebarCategory from '@/src/components/shop/sidebar/sidebarCategory'
import React from 'react'

interface Props {
  children: React.ReactNode,
  params: Promise<{
    category: string
  }>
}

const CategoryLayout = async ({ children, params }: Props) => {

  const { category } = await params

  const { categorias, marcas, subcategorias } = await getCategorizacionSidebar(category)

  return (
    <section className="">
      <div className="flex gap-7.5">
        <SidebarCategory
          categorias={categorias || []}
          marcas={marcas}
          subcategorias={subcategorias}
        />
        {/* <Sidebar
              subcategorias={subcategorias}
              marcas={marcas}
              tallas={tallas}
            /> */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  )
}
export default CategoryLayout