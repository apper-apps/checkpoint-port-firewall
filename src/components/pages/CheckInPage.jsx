import React, { useState } from "react"
import QRScanner from "@/components/organisms/QRScanner"
import ManualCheckIn from "@/components/organisms/ManualCheckIn"
import ActivityFeed from "@/components/organisms/ActivityFeed"
import LiveStats from "@/components/organisms/LiveStats"
import attendanceService from "@/services/api/attendanceService"
import userService from "@/services/api/userService"
import { toast } from "react-toastify"

const CheckInPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCheckIn = async (checkInData) => {
    try {
      // Get user info
      let user
try {
        user = await userService.getById(checkInData.userId)
      } catch {
        // Create a mock user if not found
        user = {
          Id: checkInData.userId,
          Name: `User ${checkInData.userId}`,
          email_c: `${checkInData.userId}@example.com`
        }
      }

      // Create attendance record
const attendanceRecord = {
        user_id_c: user.Id,
        user_name_c: user.Name,
        check_in_time_c: checkInData.timestamp,
        method_c: checkInData.method,
        status_c: "Present"
      }

      await attendanceService.create(attendanceRecord)
      
      // Refresh data
      setRefreshTrigger(prev => prev + 1)
      
      toast.success(`${user.name} checked in successfully via ${checkInData.method}!`)
    } catch (error) {
      console.error("Check-in error:", error)
      toast.error("Failed to process check-in. Please try again.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Live Stats */}
      <div className="mb-8">
        <LiveStats refreshTrigger={refreshTrigger} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Check-in Methods */}
        <div className="lg:col-span-2 space-y-8">
          <QRScanner 
            onScan={handleCheckIn}
            isActive={true}
          />
          <ManualCheckIn 
            onCheckIn={handleCheckIn}
          />
        </div>

        {/* Right Column - Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed 
            refreshTrigger={refreshTrigger}
            limit={15}
          />
        </div>
      </div>
    </div>
  )
}

export default CheckInPage