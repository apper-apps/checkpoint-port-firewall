import React, { useState } from "react"
import LiveStats from "@/components/organisms/LiveStats"
import AttendanceChart from "@/components/organisms/AttendanceChart"
import ActivityFeed from "@/components/organisms/ActivityFeed"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import { format } from "date-fns"

const DashboardPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time attendance monitoring for {format(new Date(), "EEEE, MMMM dd, yyyy")}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Refresh</span>
          </button>
        </div>
      </div>

      {/* Live Stats */}
      <div className="mb-8">
        <LiveStats refreshTrigger={refreshTrigger} />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Chart */}
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <ActivityFeed 
            refreshTrigger={refreshTrigger}
            limit={8}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card gradient className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/check-in"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg hover:from-primary/10 hover:to-primary/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-200">
                <ApperIcon name="Scan" className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Quick Check-in</div>
                <div className="text-sm text-gray-600">Start scanning</div>
              </div>
            </a>

            <a
              href="/reports"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-lg hover:from-success/10 hover:to-success/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center group-hover:bg-success/30 transition-colors duration-200">
                <ApperIcon name="FileText" className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="font-medium text-gray-900">View Reports</div>
                <div className="text-sm text-gray-600">Detailed analytics</div>
              </div>
            </a>

            <a
              href="/settings"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 rounded-lg hover:from-secondary/10 hover:to-secondary/20 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-200">
                <ApperIcon name="Settings" className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Settings</div>
                <div className="text-sm text-gray-600">Configure system</div>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage