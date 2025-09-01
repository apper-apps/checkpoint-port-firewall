import React, { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import Chart from "react-apexcharts"
import attendanceService from "@/services/api/attendanceService"
import { format, subDays } from "date-fns"

const AttendanceChart = ({ className }) => {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadChartData()
  }, [])

  const loadChartData = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Get last 7 days of data
      const days = []
      const presentCounts = []
      const lateCounts = []
      
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i)
        const dateStr = format(date, "yyyy-MM-dd")
        const records = await attendanceService.getByDate(dateStr)
        
        days.push(format(date, "MMM dd"))
        presentCounts.push(records.filter(r => r.status === "Present").length)
        lateCounts.push(records.filter(r => r.status === "Late").length)
      }

      const options = {
        chart: {
          type: "line",
          height: 350,
          toolbar: { show: false },
          background: "transparent"
        },
        colors: ["#10B981", "#F59E0B"],
        stroke: {
          curve: "smooth",
          width: 3
        },
        grid: {
          borderColor: "#e5e7eb",
          strokeDashArray: 3
        },
        xaxis: {
          categories: days,
          labels: {
            style: { colors: "#6b7280" }
          }
        },
        yaxis: {
          labels: {
            style: { colors: "#6b7280" }
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          labels: { colors: "#6b7280" }
        },
        tooltip: {
          theme: "light",
          style: { fontSize: "12px" }
        },
        markers: {
          size: 6,
          strokeWidth: 2,
          fillOpacity: 1,
          strokeOpacity: 1
        }
      }

      const series = [
        {
          name: "Present",
          data: presentCounts
        },
        {
          name: "Late",
          data: lateCounts
        }
      ]

      setChartData({ options, series })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading className={className} />
  if (error) return <Error message={error} onRetry={loadChartData} className={className} />

  return (
    <Card gradient className={cn("", className)}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
            <ApperIcon name="BarChart3" className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">7-Day Attendance Trend</h3>
        </div>

        {chartData && (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
          />
        )}
      </div>
    </Card>
  )
}

export default AttendanceChart