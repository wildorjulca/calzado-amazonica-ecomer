
'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Color, useVariants } from '@/src/hooks/admin/useVariants';
import clsx from 'clsx';

interface Props {
    colores: Color[]
    selectedColors: Color[]
    onToggleColor: (color: Color) => void
}
const ColorSelector = ({ colores, selectedColors, onToggleColor }: Props) => {



    return (
        <div className='mt-4'>
            <Card>
                <CardContent>
                    <CardTitle className=''>
                        Elige las colores que va a tener tu producto

                    </CardTitle>
                    <CardDescription>
                        Toca cada color que tengas disponible. Puedes seleccionar varios.
                    </CardDescription>


                    <div className="flex flex-wrap w-full gap-4 mt-4">
                        {colores.map((c) => {

                            const isActive = selectedColors.some(item => item.id === c.id)

                            return (
                                <div
                                    onClick={() => onToggleColor(c)}
                                    key={c.id}
                                    className={
                                        clsx(
                                            "flex flex-col items-center justify-center gap-2 border p-2 rounded hover:shadow-lg transition-shadow duration-200",
                                            {
                                                "border-blue-600 right-2 ring-blue-200": isActive

                                            }
                                        )
                                    }
                                >
                                    <button
                                        className="w-10 h-10 rounded-full border border-gray-300 hover:ring-2 hover:ring-offset-1 hover:ring-gray-400 transition-all duration-200"
                                        style={{ backgroundColor: `${c.codigo_hex}` }}
                                        aria-label={c.nombre}
                                    />
                                    <p className="text-sm font-medium text-center">{c.nombre}</p>
                                    <p className="text-xs text-gray-500">{c.codigo_hex}</p>
                                </div>
                            )
                        }
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default ColorSelector