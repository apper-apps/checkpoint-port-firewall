import React from "react"
import { cn } from "@/utils/cn"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"

const ActivityItem = ({
  record,
  showDate = true,
  className
}) => {
const getMethodIcon = (method) => {
    switch (method) {
      case "QR Code": return "QrCode"
      case "RFID": return "CreditCard"
      case "Facial Recognition": return "Eye"
      case "Manual": return "User"
      default: return "Clock"
    }
  }

const getStatusVariant = (status) => {
    switch (status) {
      case "Present": return "present"
      case "Late": return "late"
      case "Absent": return "absent"
      default: return "default"
    }
  }

return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 transition-colors duration-200",
      className
    )}>
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
          <ApperIcon name={getMethodIcon(record.method_c)} className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{record.user_name_c}</p>
        <p className="text-xs text-gray-500">
          {showDate && format(new Date(record.check_in_time_c), "MMM dd")} • {format(new Date(record.check_in_time_c), "HH:mm")} • {record.method_c}
        </p>
      </div>
      
      <Badge variant={getStatusVariant(record.status_c)}>
        {record.status_c}
      </Badge>
    </div>
  )
}

export default ActivityItem