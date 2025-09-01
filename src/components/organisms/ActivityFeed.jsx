import React, { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import ActivityItem from "@/components/molecules/ActivityItem"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import attendanceService from "@/services/api/attendanceService"
import { format } from "date-fns"

const ActivityFeed = ({ className, refreshTrigger, limit = 10 }) => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadActivities()
  }, [refreshTrigger, limit])

  const loadActivities = async () => {
    try {
      setLoading(true)
      setError("")
      
      const today = format(new Date(), "yyyy-MM-dd")
const records = await attendanceService.getByDate(today)
      
      // Sort by check-in time and limit results
      const sorted = records
        .sort((a, b) => new Date(b.check_in_time_c) - new Date(a.check_in_time_c))
        .slice(0, limit)
      
      setActivities(sorted)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading className={className} />
  if (error) return <Error message={error} onRetry={loadActivities} className={className} />

  return (
    <Card gradient className={cn("", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-info/10 to-info/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Activity" className="h-5 w-5 text-info" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2" />
            Live
          </div>
        </div>

        <div className="space-y-3">
          {activities.length === 0 ? (
            <Empty
              title="No recent activity"
              message="Check-ins will appear here as they happen"
              icon="Clock"
            />
          ) : (
            activities.map((activity) => (
              <ActivityItem
                key={activity.Id}
                record={activity}
                showDate={false}
              />
            ))
          )}
        </div>

        {activities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Showing {activities.length} most recent check-ins for {format(new Date(), "MMMM dd, yyyy")}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ActivityFeed