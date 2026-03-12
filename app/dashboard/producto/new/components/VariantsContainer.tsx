
'use client'

import ColorSelector from './ColorSelector'
import { Color, Talla, useVariants } from '@/src/hooks/admin/useVariants'
import TallaSelector from './TallaSelector';
import VariantsTable from './VariantsTable';
import ColorImageSelector from './ColorImageSelector';
import { useImageManager } from '@/src/hooks/admin/useImageManager';


interface Props {
    colores: Color[]
    tallas: Talla[]
}
const VariantsContainer = ({ colores, tallas }: Props) => {

    const variants = useVariants()
    const managerImage = useImageManager()

    return (
        <div>
            <ColorImageSelector
                coloresSeleccionados={variants.selectedColors}
                subirImagenesColor={managerImage.subirImagenesColor}
                onDeleteImagen={managerImage.onDeleteImagen}
                handleUpdateImage={managerImage.handleUpdateImage}
                imagenesPorColor={managerImage.imagenesPorColor}
            />


            <ColorSelector
                colores={colores || []}
                selectedColors={variants.selectedColors}
                onToggleColor={variants.onToggleColor}

            />
            <TallaSelector
                tallas={tallas || []}
                onToggleZise={variants.onToggleZise}
                selectedZises={variants.selectedZises}
            />
            <VariantsTable
                variantes={variants.variantes}
                generarVariantes={variants.generarVariantes}
                eliminarVariante={variants.eliminarVariante}
                updateStockVariante={variants.updateStockVariante}
                updatePriceVariante={variants.updatePriceVariante}
            />
        </div>
    )
}

export default VariantsContainer