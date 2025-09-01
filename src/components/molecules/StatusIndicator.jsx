import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import { motion } from "framer-motion"

const StatusIndicator = ({
  status,
  message,
  className
}) => {
  const statusConfig = {
    scanning: {
      icon: "Scan",
      color: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/20",
      animation: "animate-pulse"
    },
    success: {
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      animation: "animate-success-scale"
    },
    error: {
      icon: "XCircle",
      color: "text-error",
      bgColor: "bg-error/10",
      borderColor: "border-error/20",
      animation: ""
    },
    processing: {
      icon: "Loader",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      animation: "animate-spin"
    }
  }

  const config = statusConfig[status] || statusConfig.scanning

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border transition-all duration-200",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <ApperIcon 
        name={config.icon} 
        className={cn(
          "h-5 w-5",
          config.color,
          config.animation
        )}
      />
      <span className={cn("font-medium", config.color)}>
        {message}
      </span>
    </motion.div>
  )
}

export default StatusIndicator