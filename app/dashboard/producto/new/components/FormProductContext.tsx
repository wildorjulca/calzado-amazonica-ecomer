

'use client'

import { FormInputs, useProductFormRHF } from '@/src/hooks/admin/useProductFormRHF'
import React from 'react'
import { FormProvider, SubmitHandler } from 'react-hook-form'

interface Props {
    children: React.ReactNode
}
const FormProductContext = ({ children }: Props) => {

    const methods = useProductFormRHF()

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log("data product", data)
    }

    return (
        <FormProvider  {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider >
    )
}

export default FormProductContext