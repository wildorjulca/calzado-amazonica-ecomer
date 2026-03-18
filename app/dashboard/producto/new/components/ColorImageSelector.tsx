import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ImageColorItem } from '@/src/hooks/admin/useImageManager'
import { Color } from '@/src/hooks/admin/useVariants'
import { Palette, Upload } from 'lucide-react'
import React, { ChangeEvent } from 'react'
import ImagePreview from './ImagePreview'

interface Props {
    coloresSeleccionados: Color[]
    subirImagenesColor: (
        color_id: number,
        e: ChangeEvent<HTMLInputElement>
    ) => void;
    onDeleteImagen: (color_id: string) => void;
    handleUpdateImage: (imagen_id: string, e: React.ChangeEvent<HTMLInputElement>) => void;

    imagenesPorColor: ImageColorItem[]
}

const EmptyState = () => (
    <div className="text-center py-12">
        <Palette className="w-14 h-14 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-700 font-semibold text-lg">
            Selecciona colores primero
        </p>
        <p className="text-sm text-gray-500 mt-1">
            Ve a la sección "Colores" para seleccionar los colores del producto
        </p>
    </div>
)

const ColorImageSelector = ({
    coloresSeleccionados,
    subirImagenesColor,
    onDeleteImagen,
    handleUpdateImage,
    imagenesPorColor,
}: Props) => {

    const hasColors = coloresSeleccionados.length > 0

    return (
        <div className="mt-6">
            <Card className="shadow-sm border rounded-2xl">
                <CardContent className="p-6 space-y-6">
                    <CardTitle className="text-xl font-semibold">
                        Imágenes del Producto
                    </CardTitle>

                    {!hasColors ? (
                        <EmptyState />
                    ) : (
                        <div className="space-y-6">
                            {coloresSeleccionados.map((c) => {
                                const imagenesDeEsteColor = imagenesPorColor.filter(
                                    (img) => img.color_id === c.id
                                )

                                return (
                                    <div
                                        key={c.id}
                                        className="border rounded-xl p-5 bg-gray-50/50 space-y-4"
                                    >
                                        {/* Header del color */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-full border shadow-sm"
                                                    style={{ background: `${c.codigo_hex}` }}
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {c.nombre}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {imagenesDeEsteColor.length} imágenes
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Grid imágenes + upload */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                            {imagenesDeEsteColor.map((img, index) => (
                                                <ImagePreview
                                                    key={index} imagen={img}
                                                    onDelete={onDeleteImagen}
                                                    handleUpdateImage={handleUpdateImage}

                                                />
                                            ))}

                                            {/* Upload */}
                                            <label className="h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                                                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-500">
                                                    Subir imágenes
                                                </span>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        subirImagenesColor(c.id, e)
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ColorImageSelector