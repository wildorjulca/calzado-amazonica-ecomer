import React from 'react'
import { Plus, Tag } from 'lucide-react'

import { Button } from '@/src/components/ui/button'

interface Props {
    onCreate: () => void
}
const CategoriaHeader = ({ onCreate }: Props) => {
    return (
        < div className="bg-white sm:rounded-xl flex  items-center  justify-between rounded-xs border shadow-sm border-gray-200 sm:p-4 p-2 mb-4" >
            <div className="flex items-center text-gray-600 mb-1">
                <Tag className="mr-2" />
                <span className="font-semibold">Agregar Producto & categorizacion</span>
            </div>
            <Button variant="default" onClick={onCreate}>
                Crear categoria
                <Plus />
            </Button>
        </div>
    )
}

export default CategoriaHeader