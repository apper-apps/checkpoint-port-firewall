import React, { useState } from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import SearchBar from "@/components/molecules/SearchBar"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"
import userService from "@/services/api/userService"

const ManualCheckIn = ({ onCheckIn, className }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [userId, setUserId] = useState("")
  const [method, setMethod] = useState("Manual")
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const handleSearch = async (term) => {
    setSearchTerm(term)
    if (term.length >= 2) {
      try {
const allUsers = await userService.getAll()
        const filtered = allUsers.filter(user => 
          user.Name.toLowerCase().includes(term.toLowerCase()) ||
          user.email_c.toLowerCase().includes(term.toLowerCase())
        )
        setUsers(filtered.slice(0, 10)) // Limit to 10 results
      } catch (error) {
        console.error("Search error:", error)
      }
    } else {
      setUsers([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedUser && !userId) {
      toast.error("Please select a user or enter a user ID")
      return
    }

    setLoading(true)
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const checkInData = {
        userId: selectedUser || userId,
        method: method,
        timestamp: new Date().toISOString()
      }

      if (onCheckIn) {
        onCheckIn(checkInData)
      }

      // Reset form
      setSearchTerm("")
      setSelectedUser("")
      setUserId("")
      setUsers([])
      
      toast.success("Check-in successful!")
    } catch (error) {
      toast.error("Check-in failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card gradient className={cn("", className)}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-lg flex items-center justify-center">
            <ApperIcon name="User" className="h-5 w-5 text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Manual Check-in</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Search User" id="search">
            <SearchBar
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            
            {users.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
                {users.map((user) => (
                  <button
                    key={user.Id}
                    type="button"
                    onClick={() => {
setSelectedUser(user.Id)
                      setSearchTerm(user.Name)
                      setUsers([])
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                  >
<div className="font-medium text-gray-900">{user.Name}</div>
                    <div className="text-sm text-gray-500">{user.email_c}</div>
                  </button>
                ))}
              </div>
            )}
          </FormField>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <FormField 
            label="User ID" 
            id="userId"
            placeholder="Enter user ID..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <FormField label="Check-in Method" id="method">
            <Select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="Manual">Manual Entry</option>
              <option value="RFID">RFID Card</option>
              <option value="Facial Recognition">Facial Recognition</option>
            </Select>
          </FormField>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <ApperIcon name="Loader" className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ApperIcon name="UserCheck" className="h-4 w-4 mr-2" />
                Check In
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  )
}

export default ManualCheckIn