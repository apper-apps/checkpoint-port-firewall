import userData from "@/services/mockData/users.json"

class UserService {
  constructor() {
    // Initialize with mock data
    this.data = [...userData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.data]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const user = this.data.find(item => item.Id === parseInt(id) || item.Id === id)
    if (!user) {
      throw new Error("User not found")
    }
    return { ...user }
  }

  async getByEmail(email) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const user = this.data.find(item => item.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      throw new Error("User not found")
    }
    return { ...user }
  }

  async create(user) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newId = Math.max(...this.data.map(item => item.Id), 0) + 1
    const newUser = {
      Id: newId,
      qrCode: `QR_${newId}`,
      rfidTag: `RFID_${newId}`,
      ...user
    }
    
    this.data.push(newUser)
    return { ...newUser }
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 350))
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("User not found")
    }
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("User not found")
    }
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const searchTerm = query.toLowerCase()
    return this.data.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    ).map(user => ({ ...user }))
  }
}

export default new UserService()