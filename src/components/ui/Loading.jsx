import React from "react"
import { cn } from "@/utils/cn"

const Loading = ({ className, variant = "default" }) => {
  if (variant === "table") {
    return (
      <div className={cn("space-y-3", className)}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === "stats") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2" />
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-2" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "scanner") {
    return (
      <div className={cn("flex flex-col items-center justify-center h-96 space-y-4", className)}>
        <div className="w-64 h-64 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.1s" }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
      </div>
    </div>
  )
}

export default Loading