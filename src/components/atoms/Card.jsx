import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({
  className,
  gradient = false,
  ...props
}, ref) => {
  const baseStyles = "rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200"
  const gradientStyles = gradient ? "bg-gradient-to-br from-white to-gray-50 border-gray-100 shadow-md" : ""
  
  return (
    <div
      ref={ref}
      className={cn(baseStyles, gradientStyles, className)}
      {...props}
    />
  )
})

Card.displayName = "Card"

export default Card