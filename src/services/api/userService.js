class UserService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'user_c'
  }

  async getAll() {
    try {
      const params = {
        "fields": [
          {
            "field": {
              "Name": "Name"
            }
          },
          {
            "field": {
              "Name": "email_c"
            }
          },
          {
            "field": {
              "Name": "qr_code_c"
            }
          },
          {
            "field": {
              "Name": "rfid_tag_c"
            }
          },
          {
            "field": {
              "Name": "photo_c"
            }
          }
        ],
        "pagingInfo": {
          "limit": 100,
          "offset": 0
        }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching users:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        "fields": [
          {
            "field": {
              "Name": "Name"
            }
          },
          {
            "field": {
              "Name": "email_c"
            }
          },
          {
            "field": {
              "Name": "qr_code_c"
            }
          },
          {
            "field": {
              "Name": "rfid_tag_c"
            }
          },
          {
            "field": {
              "Name": "photo_c"
            }
          }
        ]
      }
      
const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching user:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async getByEmail(email) {
    try {
      const params = {
        "fields": [
          {
            "field": {
              "Name": "Name"
            }
          },
          {
            "field": {
              "Name": "email_c"
            }
          },
          {
            "field": {
              "Name": "qr_code_c"
            }
          },
          {
            "field": {
              "Name": "rfid_tag_c"
            }
          },
          {
            "field": {
              "Name": "photo_c"
            }
          }
        ],
        "where": [
          {
            "FieldName": "email_c",
            "Operator": "EqualTo",
            "Values": [email]
          }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
if (!response.success) {
        console.error(response.message)
        return null
        throw new Error(response.message)
      }
      
      if (!response.data || response.data.length === 0) {
        throw new Error("User not found")
      }
      
      return response.data[0]
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching user by email:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async create(user) {
    try {
      const params = {
        records: [
          {
            // Only include Updateable fields
            Name: user.Name || user.name,
            email_c: user.email_c || user.email,
            qr_code_c: user.qr_code_c || user.qrCode || `QR_${Date.now()}`,
            rfid_tag_c: user.rfid_tag_c || user.rfidTag || `RFID_${Date.now()}`,
            photo_c: user.photo_c || user.photo || ""
          }
        ]
      }
      
      const response = await this.apperClient.createRecord(this.tableName, params)
      
if (!response.success) {
        console.error(response.message)
        return null
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create user ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating user:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async update(id, updateData) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            // Only include Updateable fields
            ...(updateData.Name !== undefined && { Name: updateData.Name }),
            ...(updateData.email_c !== undefined && { email_c: updateData.email_c }),
            ...(updateData.qr_code_c !== undefined && { qr_code_c: updateData.qr_code_c }),
            ...(updateData.rfid_tag_c !== undefined && { rfid_tag_c: updateData.rfid_tag_c }),
            ...(updateData.photo_c !== undefined && { photo_c: updateData.photo_c })
          }
        ]
      }
      
      const response = await this.apperClient.updateRecord(this.tableName, params)
      
if (!response.success) {
        console.error(response.message)
        return false
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update user ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating user:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
if (!response.success) {
        console.error(response.message)
        return []
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete user ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting user:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async search(query) {
    try {
      const params = {
        "fields": [
          {
            "field": {
              "Name": "Name"
            }
          },
          {
            "field": {
              "Name": "email_c"
            }
          },
          {
            "field": {
              "Name": "qr_code_c"
            }
          },
          {
            "field": {
              "Name": "rfid_tag_c"
            }
          },
          {
            "field": {
              "Name": "photo_c"
            }
          }
        ],
        "whereGroups": [
          {
            "operator": "OR",
            "subGroups": [
              {
                "conditions": [
                  {
                    "fieldName": "Name",
                    "operator": "Contains",
                    "values": [query]
                  }
                ],
                "operator": "OR"
              },
              {
                "conditions": [
                  {
                    "fieldName": "email_c",
                    "operator": "Contains",
                    "values": [query]
                  }
                ],
                "operator": "OR"
              }
            ]
          }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
if (!response.success) {
        console.error(response.message)
        return []
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching users:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }
}

export default new UserService()