import { textFont3, textFont4 } from '@/config/fonts'
import React from 'react'

interface Props {
    message?: string;
    className?: string
}
const ErrorMessage = ({  message, className="" }: Props) => {
  return (
    <p className={`${textFont4.className}  text-red-500 text-sm  ${className}`}>{message}</p>
  )
}

export default ErrorMessage