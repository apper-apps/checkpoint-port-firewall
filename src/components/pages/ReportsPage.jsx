import React from "react"
import ReportsTable from "@/components/organisms/ReportsTable"
import AttendanceChart from "@/components/organisms/AttendanceChart"
import LiveStats from "@/components/organisms/LiveStats"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"

const ReportsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Attendance Reports
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive attendance analytics and detailed reporting
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="Calendar" className="h-4 w-4" />
            <span>{format(new Date(), "EEEE, MMMM dd, yyyy")}</span>
          </div>
        </div>
      </div>

      {/* Current Stats */}
      <div className="mb-8">
        <LiveStats />
      </div>

      {/* Chart and Table */}
      <div className="space-y-8">
        <AttendanceChart />
        <ReportsTable />
      </div>
    </div>
  )
}

export default ReportsPage