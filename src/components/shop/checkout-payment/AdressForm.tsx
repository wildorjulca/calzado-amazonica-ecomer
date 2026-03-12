'use client'

import { useForm, SubmitHandler, useFormContext } from "react-hook-form"
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getRegion } from '@/src/actions/shop/country/getRegion'
import { useDistritos, useProvincias, useRegions } from '@/src/hooks/queries/country/useContry'
import { Region } from '@/src/interface/country'
import { CircleQuestionMarkIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SelectSkeleton } from '../skeleton/select-skeleton'
import ErrorMessage from "../ErrorMessage"
import { Skeleton } from "../../ui/skeleton"
import { useSaveAddressMutation } from "@/src/hooks/queries/adress/useAdressMutation"
import { CheckoutFormInputs } from "@/app/checkout-payment/page";



interface Props {
  isOpen?: boolean;
  onClose?: () => void
}
const AdressForm = ({ isOpen, onClose }: Props) => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }

  } = useFormContext<CheckoutFormInputs>()

  const regionId = watch("region_id")
  const provinciaId = watch("provincia_id")


  useEffect(() => {
    setValue("provincia_id", "")
    setValue("distrito_id", "")

  }, [regionId, setValue])

  useEffect(() => {
    setValue("distrito_id", "")
  }, [provinciaId, setValue])



  const mutation = useSaveAddressMutation(onClose)


  const { data: regiones, isLoading } = useRegions()
  const { data: provincias, isLoading: loadingProv } = useProvincias(Number(regionId))
  const { data: distritos, isLoading: isLoadingDist } = useDistritos(Number(provinciaId))


  // const onSubmit: SubmitHandler<FormInputs> = (data) => {

  //   mutation.mutate({
  //     nombres: data.nombres,
  //     apellidos: data.apellidos,
  //     telefono: data.telefono,
  //     direccion: data.direccion,
  //     referencia: data.referencia,
  //     es_principal: data.es_principal ?? false,
  //     distrito_id: Number(data.distrito_id),
  //   })
  // }


  return (
    <motion.div
      key={"form-user-addres"}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[17px] font-medium text-gray-900">
          ENTREGA
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Calle y Número */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            placeholder="Nombres"
            className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            {...register("nombres", {
              required: "Este campo es requerido",
              maxLength: {
                value: 100,
                message: "Este campo acepta 100 caracteres Maximo"
              }
            })}
          />
          {errors.nombres && <ErrorMessage className="mt-1" message={errors.nombres.message} />}

        </div>
        <div>
          <input
            type="text"
            placeholder="Apellidos"
            className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            {...register("apellidos", {
              required: "Este campo es requerido",
              maxLength: {
                value: 200,
                message: "Este campo acepta 200 caracteres Maximo"
              }
            })}
          />
          {errors.apellidos && <ErrorMessage className="mt-1" message={errors.apellidos.message} />}

        </div>


      </div>

      {/* Referencia */}
      <input
        type="text"
        placeholder="Referencia (opcional)"
        className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
      />

      {/* Departamento / Provincia / Distrito */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          {isLoading ? <SelectSkeleton /> : (
            <div>
              <select
                className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                {...register("region_id", {
                  required: "Este campo es obligatorio"
                })}
              >
                <option value={""}>Departamento</option>
                {regiones?.map((reg) => (
                  <option key={reg.id} value={reg.id}>{reg.nombre}</option>
                ))}
              </select>
              {errors.region_id && <ErrorMessage message={errors.region_id.message} />}
            </div>
          )}
        </div>
        <div>
          {loadingProv ? <SelectSkeleton /> : (
            <div>
              <select
                className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                disabled={!regionId}
                {...register("provincia_id", { required: "Campo requerido" })}
              >
                <option value={""}>Seleccione provincia</option>
                {provincias?.map((prov) => (
                  <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                ))}
              </select>
              {errors.provincia_id && <ErrorMessage message={errors.provincia_id.message} />}
            </div>
          )}
        </div>

        <div>
          {isLoadingDist ? <SelectSkeleton /> : (
            <div>
              <select
                disabled={!provinciaId}
                className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                {...register("distrito_id", { required: "Campo requerido", setValueAs: (value) => Number(value) })}
              >
                <option value={""}>Selelecione Distrito</option>
                {distritos?.map((dist) => (
                  <option key={dist.id} value={dist.id}>{dist.nombre}</option>
                ))}
              </select>
              {errors.distrito_id && <ErrorMessage message={errors.distrito_id.message} />}
            </div>

          )}
        </div>
      </div>

      {/* Notas */}
      <div>
        <textarea
          rows={3}
          placeholder="Notas adicionales (direccion)"
          className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          {...register("direccion", { required: "Este campo es obligatorio" })}
        />
        {errors.direccion && <ErrorMessage message={errors.direccion.message} />}

      </div>

      <div className='relative'>
        <input
          type="text"
          placeholder="Telefono"
          className="w-full px-3 py-3 border border-gray-300 rounded text-[14px] focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          {...register("telefono", {
            required: "Este campo es requerido"
          })}
        />
        {errors.telefono && <ErrorMessage className="mt-1" message={errors.telefono.message} />}
        <div className='absolute top-3 right-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleQuestionMarkIcon strokeWidth={1} size={20} />
            </TooltipTrigger>
            <TooltipContent>
              <p>En caso de que tengamos que contactarte sobre tu pedido</p>
            </TooltipContent>
          </Tooltip>
        </div>


        {/* <label className='text-sm ml-2 text-gray-500'>En caso de que tengamos que contactarte sobre tu pedido</label> */}
      </div>


      {/* Dirección principal */}
      <div className="flex items-center">
        <input
          type="checkbox"
          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
          {...register("es_principal")}
        />
        <label className="ml-2 text-[14px] text-gray-700">
          Establecer como dirección principal
        </label>
      </div>

      {/* Botones */}
      {/* <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded text-[14px] hover:bg-gray-50 transition-colors hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            aria-disabled={mutation.isPending}
            type="submit"
            className="flex-1 px-4 py-2 bg-black text-white rounded text-[14px] hover:bg-gray-800 transition-colors hover:cursor-pointer"
          >
            {mutation.isPending ? "Guardando..." : "Guardar dirección"}
          </button>
        </div>
      </form> */}

    </motion.div>

  )
}

export default AdressForm