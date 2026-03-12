


import { Tag } from "lucide-react"
import BasicInfo from "./components/BasicInfo"
import CategorySection from "./components/CategorySection"
import { getCatalogData } from "@/src/actions/admin/product"
import ColorSelector from "./components/ColorSelector"
import TallaSelector from "./components/TallaSelector"
import VariantsManager from "./components/VariantsTable"
import FormProductContext from "./components/FormProductContext"
import FormActions from "./components/FormActions"
import VariantsContainer from "./components/VariantsContainer"
import StatusSelector from "./components/StatusSelector"

const NewProductPage = async () => {
    const { categorias, colores, tallas, marcas, generos } = await getCatalogData()

    return (
        <div className="min-h-screen">
            <div className="mx-auto">
                {/* Encabezado del header */}
                <div className="bg-white sm:rounded-xl rounded-xs border shadow-sm border-gray-200 sm:p-4 p-2 mb-4">
                    <div className="flex items-center text-gray-600 mb-1">
                        <Tag className="mr-2" />
                        <span className="font-semibold">Agregar Producto & categorizacion</span>
                    </div>
                    <p className="text-xs text-amber-700">
                        Componentes modulares y reutilizables. Código organizado y escalable.
                    </p>
                </div>

                {/* Section */}
                <FormProductContext>
                    <section className="grid grid-cols-4 gap-8 ">
                        <div className="col-span-3 ">
                            <BasicInfo />

                            <VariantsContainer
                                colores={colores || []}
                                tallas={tallas || []}
                            />
                            {/* <div>
                            
                        </div> */}
                        </div>

                        {/* categorizacion */}
                        <div>
                            <CategorySection
                                categoria={categorias || []}
                                marcas={marcas || []}
                                generos={generos || []}

                            />
                            <StatusSelector />
                            {/* Acciones (Guardar, Cancelar, Limpiar) */}
                            <FormActions />
                        </div>
                    </section>
                </FormProductContext>


            </div>
        </div>
    )
}

export default NewProductPage