import React, { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import StatCard from "@/components/molecules/StatCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import attendanceService from "@/services/api/attendanceService"
import { format } from "date-fns"

const LiveStats = ({ className, refreshTrigger }) => {
  const [stats, setStats] = useState({
    totalPresent: 0,
    totalRegistered: 100,
    attendanceRate: 0,
    recentCheckIns: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadStats()
  }, [refreshTrigger])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError("")
      
const today = format(new Date(), "yyyy-MM-dd")
      const todayRecords = await attendanceService.getByDate(today)
      
      const present = todayRecords.filter(r => r.status_c === "Present" || r.status_c === "Late").length
      const rate = Math.round((present / stats.totalRegistered) * 100)
      const recent = todayRecords.filter(r => {
        const checkInTime = new Date(r.check_in_time_c)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
        return checkInTime >= oneHourAgo
      }).length

      setStats({
        totalPresent: present,
        totalRegistered: 100,
        attendanceRate: rate,
        recentCheckIns: recent
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading variant="stats" className={className} />
  if (error) return <Error message={error} onRetry={loadStats} className={className} />

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      <StatCard
        title="Present Today"
        value={stats.totalPresent}
        icon="Users"
        trend="up"
        trendValue="+5 from yesterday"
      />
      <StatCard
        title="Total Registered"
        value={stats.totalRegistered}
        icon="UserCheck"
        trend="neutral"
        trendValue="No change"
      />
      <StatCard
        title="Attendance Rate"
        value={`${stats.attendanceRate}%`}
        icon="TrendingUp"
        trend={stats.attendanceRate >= 80 ? "up" : "down"}
        trendValue={`${stats.attendanceRate >= 80 ? "Above" : "Below"} target`}
      />
      <StatCard
        title="Recent Check-ins"
        value={stats.recentCheckIns}
        icon="Clock"
        trend="up"
        trendValue="Last hour"
      />
    </div>
  )
}

export default LiveStats