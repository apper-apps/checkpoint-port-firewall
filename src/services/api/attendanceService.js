import attendanceData from "@/services/mockData/attendance.json"

class AttendanceService {
  constructor() {
    // Initialize with mock data
    this.data = [...attendanceData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.data]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const record = this.data.find(item => item.Id === parseInt(id))
    if (!record) {
      throw new Error("Attendance record not found")
    }
    return { ...record }
  }

  async getByDate(date) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const targetDate = new Date(date).toISOString().split('T')[0]
    return this.data
      .filter(record => {
        const recordDate = new Date(record.checkInTime).toISOString().split('T')[0]
        return recordDate === targetDate
      })
      .map(record => ({ ...record }))
  }

  async getByUserId(userId) {
    await new Promise(resolve => setTimeout(resolve, 250))
    return this.data
      .filter(record => record.userId === userId)
      .map(record => ({ ...record }))
  }

  async create(record) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newId = Math.max(...this.data.map(item => item.Id), 0) + 1
    const newRecord = {
      Id: newId,
      checkOutTime: null,
      ...record
    }
    
    this.data.push(newRecord)
    return { ...newRecord }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350))
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Attendance record not found")
    }
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Attendance record not found")
    }
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async checkOut(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const record = this.data.find(item => item.Id === parseInt(id))
    if (!record) {
      throw new Error("Attendance record not found")
    }
    
    record.checkOutTime = new Date().toISOString()
    return { ...record }
  }
}

export default new AttendanceService()