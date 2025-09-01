import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import attendanceService from "@/services/api/attendanceService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const ReportsTable = ({ className }) => {
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("checkInTime")
  const [sortOrder, setSortOrder] = useState("desc")

  useEffect(() => {
    loadRecords()
  }, [])

  useEffect(() => {
    filterAndSortRecords()
  }, [records, searchTerm, statusFilter, sortField, sortOrder])

  const loadRecords = async () => {
    try {
      setLoading(true)
      setError("")
      
      const today = format(new Date(), "yyyy-MM-dd")
      const todayRecords = await attendanceService.getByDate(today)
      
      setRecords(todayRecords)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortRecords = () => {
    let filtered = [...records]

    // Apply search filter
if (searchTerm) {
      filtered = filtered.filter(record =>
        record.user_name_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.user_id_c?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(record => record.status_c === statusFilter)
    }

// Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "check_in_time_c" || sortField === "check_out_time_c") {
        aValue = new Date(aValue || 0)
        bValue = new Date(bValue || 0)
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    setFilteredRecords(filtered)
  }

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const exportToCSV = () => {
    if (filteredRecords.length === 0) {
      toast.warning("No data to export")
      return
    }

    const headers = ["Name", "User ID", "Check-in Time", "Check-out Time", "Status", "Method"]
    const csvContent = [
      headers.join(","),
      ...filteredRecords.map(record => [
record.user_name_c,
        record.user_id_c,
        format(new Date(record.check_in_time_c), "yyyy-MM-dd HH:mm:ss"),
        record.check_out_time_c ? format(new Date(record.check_out_time_c), "yyyy-MM-dd HH:mm:ss") : "",
        record.status_c,
        record.method_c
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `attendance-report-${format(new Date(), "yyyy-MM-dd")}.csv`
    link.click()
    window.URL.revokeObjectURL(url)

    toast.success("Report exported successfully!")
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Present": return "present"
      case "Late": return "late"
      case "Absent": return "absent"
      default: return "default"
    }
  }

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-gray-900 transition-colors duration-200"
    >
      {children}
      <ApperIcon
        name={sortField === field ? (sortOrder === "asc" ? "ChevronUp" : "ChevronDown") : "ChevronsUpDown"}
        className="h-4 w-4"
      />
    </button>
  )

  if (loading) return <Loading variant="table" className={className} />
  if (error) return <Error message={error} onRetry={loadRecords} className={className} />

  return (
    <Card gradient className={cn("", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Today's Attendance Report</h3>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
<thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <SortButton field="user_name_c">Name</SortButton>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <SortButton field="check_in_time_c">Check-in</SortButton>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <SortButton field="method_c">Method</SortButton>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <SortButton field="status_c">Status</SortButton>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12">
                    <Empty
                      title="No records found"
                      message="No attendance records match your current filters"
                      icon="Search"
                    />
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr
                    key={record.Id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
<td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{record.user_name_c}</div>
                      <div className="text-sm text-gray-500">{record.user_id_c}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">
                        {format(new Date(record.check_in_time_c), "HH:mm")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(record.check_in_time_c), "MMM dd")}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ApperIcon
                          name={record.method_c === "QR Code" ? "QrCode" : record.method_c === "RFID" ? "CreditCard" : "User"}
                          className="h-4 w-4"
                        />
                        {record.method_c}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusVariant(record.status_c)}>
                        {record.status_c}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {record.check_out_time_c
                        ? (() => {
                            const duration = new Date(record.check_out_time_c) - new Date(record.check_in_time_c)
                            const hours = Math.floor(duration / (1000 * 60 * 60))
                            const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
                            return `${hours}h ${minutes}m`
                          })()
                        : "Active"
                      }
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredRecords.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredRecords.length} of {records.length} records</span>
            <span>{format(new Date(), "MMMM dd, yyyy")}</span>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ReportsTable