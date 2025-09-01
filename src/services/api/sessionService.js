import sessionData from "@/services/mockData/sessions.json"

class SessionService {
  constructor() {
    // Initialize with mock data
    this.data = [...sessionData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.data]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const session = this.data.find(item => item.Id === parseInt(id))
    if (!session) {
      throw new Error("Session not found")
    }
    return { ...session }
  }

  async getByDate(date) {
    await new Promise(resolve => setTimeout(resolve, 250))
    return this.data
      .filter(session => session.date === date)
      .map(session => ({ ...session }))
  }

  async create(session) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newId = Math.max(...this.data.map(item => item.Id), 0) + 1
    const newSession = {
      Id: newId,
      ...session
    }
    
    this.data.push(newSession)
    return { ...newSession }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350))
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Session not found")
    }
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Session not found")
    }
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default new SessionService()