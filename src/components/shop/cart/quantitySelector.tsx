import { Button } from '@/components/ui/button'
import { Minus, Plus, X } from 'lucide-react'
import React from 'react'


interface Props {
  onQuantityChanged: (cantidad: number) => void,
  quantity: number

}
const QuantitySelector = ({ onQuantityChanged, quantity }: Props) => {

  const onValueQuantityChanged = (newQuantity: number) => {
    const updatedQuantity = quantity + newQuantity

    if (updatedQuantity < 1) return

    onQuantityChanged(updatedQuantity)
  }

  return (
    <div className='flex items-center gap-2.5'>
      <Button variant={"outline"} onClick={() => onValueQuantityChanged(-1)}>
        <Minus />
      </Button>
      <p>{quantity}</p>
      <Button
        variant={"outline"}
        onClick={() => onValueQuantityChanged(+1)}
      >
        <Plus />
      </Button>
    </div>
  )
}

export default QuantitySelector