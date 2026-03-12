'use client'

import React from 'react'
import { Card, CardContent, CardTitle } from "@/src/components/ui/card"
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { FormInputs } from '@/src/hooks/admin/useProductFormRHF'
import ErrorMessage from '@/src/components/shop/ErrorMessage'
const BasicInfo = () => {

    const {
        register,
        formState: { errors }
    } = useFormContext<FormInputs>()

    return (
        <Card className="w-full">
            <CardContent className="pt-0">
                <CardTitle className="">
                    Información producto
                </CardTitle>
                <div className="flex flex-col gap-2 mt-6">
                    <div>
                        <Label className="mb-1">Nombre *</Label>
                        <input
                            placeholder="Nombre de producto"
                            className="placeholder:text-shadow-muted-foreground placeholder:text-sm rounded-md border w-full py-2 px-4 outline-none transition-all focus:right-2 focus:border-blue-400 focus:ring-blue-400/20 bg-transparent"
                            {...register("nombre",
                                {
                                    required: "El nombre es requerido",
                                    maxLength: {
                                        value: 100,
                                        message: "No puede superar los 100 caracteres"
                                    }
                                }
                            )}
                        />
                        {errors.nombre && <span className='text-red-600 text-sm'>{errors.nombre.message}</span>}
                    </div>
                    <div>
                        <Label className="mb-1">Descripcion</Label>
                        <textarea
                            className="placeholder:text-shadow-muted-foreground placeholder:text-sm rounded-md border w-full py-2 px-4 outline-none transition-all focus:right-2 focus:border-blue-400 focus:ring-blue-400/20 bg-transparent"
                            placeholder="Decripcion del producto"
                            {...register("descripcion")}
                        />
                    </div>
                    <div>
                        <Label className="mb-1">Caracteristicas</Label>
                        <textarea
                            className="placeholder:text-shadow-muted-foreground placeholder:text-sm rounded-md border w-full py-2 px-4 outline-none transition-all focus:right-2 focus:border-blue-400 focus:ring-blue-400/20 bg-transparent"
                            placeholder="Caracteristicas del producto"
                            {...register("descripcion")}
                        />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default BasicInfo