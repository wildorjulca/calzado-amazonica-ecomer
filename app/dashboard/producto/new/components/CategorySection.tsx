'use client'

import { Label } from "@/components/ui/label"
import { getSubcategoriasPorCategoriaId } from "@/src/actions/admin/category";
import { Card, CardContent, CardTitle } from "@/src/components/ui/card"
import { FormInputs } from "@/src/hooks/admin/useProductFormRHF";
import { useVariants } from "@/src/hooks/admin/useVariants";
import { Subcategory } from "@/src/interface/admin/category";
import { useEffect, useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    categoria: {
        id: number;
        nombre: string;
    }[],
    marcas: {
        id: number;
        nombre: string;
    }[],
    generos: {
        id: number;
        nombre: string;
    }[]
}


const CategorySection = ({ categoria, marcas, generos }: Props) => {


    const {
        watch,
        setValue,
        register,
        formState: { errors }
    } = useFormContext<FormInputs>()

    const [subcategoria, setSubcategoria] = useState<Subcategory[]>([])
    const [isPending, startTransition] = useTransition()

    // const categoriaSeleccionada = watch("categoria_id")

    // useEffect(() => {
    //     if (!categoriaSeleccionada) {
    //         // setSubcategoria([])
    //         setValue("subcategoria_id", 0)
    //         return
    //     }
    //     startTransition(async () => {
    //         const categeoria = await getSubcategoriasPorCategoriaId(categoriaSeleccionada)
    //         console.log(categeoria)
    //         setSubcategoria(categeoria || [])
    //     })

    // }, [categoriaSeleccionada, setValue])


    return (
        <Card>
            <CardContent>
                <CardTitle>Categorización</CardTitle>

                <div className="flex flex-col gap-4 mt-6">

                    {/* Categoria */}
                    <div>
                        <Label className="mb-2">Seleccionar categoria *</Label>
                        <select
                            defaultValue=""
                            className="w-full rounded-md border border-gray-300 py-2 px-4 outline-none focus:ring-2 focus:ring-blue-400"
                            {...register("categoria_id", {
                                required: "Campo requerido",
                                valueAsNumber: true,
                                onChange: async (e) => {
                                    const value = Number(e.target.value)

                                    // resetear subcategoeria
                                    setValue("subcategoria_id", 0)
                                    setSubcategoria([])

                                    if (!value) return

                                    const data = await getSubcategoriasPorCategoriaId(value)
                                    console.log(data)
                                    setSubcategoria(data || [])
                                }
                            })}

                        >
                            <option value="">Seleccione</option>
                            {categoria.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>

                        {errors.categoria_id && (
                            <span className='text-red-600 text-sm'>
                                {errors.categoria_id.message}
                            </span>
                        )}
                    </div>

                    {/* Subcategoria */}
                    <div>
                        <Label className="mb-2">Seleccionar Subcategoria *</Label>
                        <select
                            defaultValue=""
                            className="w-full rounded-md border border-gray-300 py-2 px-4 outline-none focus:ring-2 focus:ring-blue-400"
                            {...register("subcategoria_id", {
                                required: "Campo requerido",
                                valueAsNumber: true
                            })}
                        >
                            <option value="">Seleccione</option>
                            {subcategoria.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                            ))}
                        </select>

                        {errors.subcategoria_id && (
                            <span className='text-red-600 text-sm'>
                                {errors.subcategoria_id.message}
                            </span>
                        )}
                    </div>

                    {/* Marca */}
                    <div>
                        <Label className="mb-2">Seleccionar Marca *</Label>
                        <select
                            defaultValue=""
                            className="w-full rounded-md border border-gray-300 py-2 px-4 outline-none focus:ring-2 focus:ring-blue-400"
                            {...register("marca_id", {
                                required: "Campo requerido",
                                valueAsNumber: true
                            })}
                        >
                            <option value="">Seleccione</option>
                            {marcas.map(m => (
                                <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>

                        {errors.marca_id && (
                            <span className='text-red-600 text-sm'>
                                {errors.marca_id.message}
                            </span>
                        )}
                    </div>

                    {/* Genero */}
                    <div>
                        <Label className="mb-2">Seleccionar genero *</Label>
                        <select
                            defaultValue=""
                            className="w-full rounded-md border border-gray-300 py-2 px-4 outline-none focus:ring-2 focus:ring-blue-400"
                            {...register("genero_id", {
                                required: "Campo requerido",
                                valueAsNumber: true
                            })}
                        >
                            <option value="">Seleccione</option>
                            {generos.map(m => (
                                <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>

                        {errors.genero_id && (
                            <span className='text-red-600 text-sm'>
                                {errors.genero_id.message}
                            </span>
                        )}
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

export default CategorySection