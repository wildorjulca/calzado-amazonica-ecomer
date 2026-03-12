'use client'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Talla, useVariants } from '@/src/hooks/admin/useVariants';
import clsx from 'clsx';


interface Props {
    tallas: Talla[],
    onToggleZise: (talla: Talla) => void;
    selectedZises: Talla[];

}
const TallaSelector = ({ tallas, onToggleZise, selectedZises }: Props) => {


    return (
        <div className='mt-4'>
            <Card>
                <CardContent>
                    <CardTitle>Tallas Disponibles</CardTitle>
                    <CardDescription>Elige las tallas esto que obtendra tu producto</CardDescription>
                    <div className='flex gap-2 flex-wrap mt-4'>
                        {tallas.map((t) => {

                            const isActive = selectedZises.some((size) => size.id === t.id)

                            return (
                                <button key={t.id}
                                    onClick={() => onToggleZise(t)}
                                    type='button'
                                    className={
                                        clsx(
                                            "w-10 h-10 rounded-sm border border-gray-300 hover:ring-2 hover:ring-offset-1 hover:ring-gray-400 transition-none duration-100",
                                            {
                                                "bg-black text-white transition-none": isActive
                                            }
                                        )
                                    }
                                >
                                    {t.valor}
                                </button>
                            )
                        }
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default TallaSelector