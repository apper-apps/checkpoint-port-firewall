import React from "react"
import { cn } from "@/utils/cn"
import Label from "@/components/atoms/Label"
import Input from "@/components/atoms/Input"

const FormField = ({
  label,
  id,
  error,
  className,
  children,
  required = false,
  ...props
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className="block">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </Label>
      )}
      {children || <Input id={id} {...props} />}
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  )
}

export default FormField