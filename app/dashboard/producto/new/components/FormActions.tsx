'use client'

import { Button } from "@/components/ui/button"
import { Eraser, RotateCcw, Save, Trash2Icon } from "lucide-react"
import { useFormContext } from "react-hook-form"


const FormActions = () => {

  return (
    <div className="flex flex-col gap-2.5 mt-8">
      <Button type="submit" className="w-full py-5">
        <Save />
        Guardar producto
      </Button>
      <Button variant={"outline"} className="w-full py-5">
        <RotateCcw />
        Guardar producto
      </Button>

    </div>
  )
}

export default FormActions