import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({
  className,
  variant = "primary",
  size = "default",
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg hover:scale-[1.02]",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:scale-[1.02]",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button