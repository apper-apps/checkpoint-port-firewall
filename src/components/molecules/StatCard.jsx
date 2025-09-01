import React from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import { motion } from "framer-motion"

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  className,
  gradient = true
}) => {
  return (
    <Card gradient={gradient} className={cn("p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary mb-1">{title}</p>
          <motion.p 
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            key={value}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {value}
          </motion.p>
          {trend && (
            <div className={cn(
              "flex items-center mt-2 text-sm",
              trend === "up" ? "text-success" : trend === "down" ? "text-error" : "text-secondary"
            )}>
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"} 
                className="h-4 w-4 mr-1"
              />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-3 rounded-xl">
          <ApperIcon name={icon} className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  )
}

export default StatCard