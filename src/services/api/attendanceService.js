class AttendanceService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'attendance_c'
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
              "Name": "user_id_c"
            }
          },
          {
            "field": {
              "Name": "user_name_c"
            }
          },
          {
            "field": {
              "Name": "check_in_time_c"
            }
          },
          {
            "field": {
              "Name": "check_out_time_c"
            }
          },
          {
            "field": {
              "Name": "method_c"
            }
          },
          {
            "field": {
              "Name": "status_c"
            }
          }
        ],
        "pagingInfo": {
          "limit": 200,
          "offset": 0
        },
        "orderBy": [
          {
            "fieldName": "check_in_time_c",
            "sorttype": "DESC"
          }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance records:", error?.response?.data?.message)
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
              "Name": "user_id_c"
            }
          },
          {
            "field": {
              "Name": "user_name_c"
            }
          },
          {
            "field": {
              "Name": "check_in_time_c"
            }
          },
          {
            "field": {
              "Name": "check_out_time_c"
            }
          },
          {
            "field": {
              "Name": "method_c"
            }
          },
          {
            "field": {
              "Name": "status_c"
            }
          }
        ]
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance record:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async getByDate(date) {
    try {
      const targetDate = new Date(date).toISOString().split('T')[0]
      
      const params = {
        "fields": [
          {
            "field": {
              "Name": "Name"
            }
          },
          {
            "field": {
              "Name": "user_id_c"
            }
          },
          {
            "field": {
              "Name": "user_name_c"
            }
          },
          {
            "field": {
              "Name": "check_in_time_c"
            }
          },
          {
            "field": {
              "Name": "check_out_time_c"
            }
          },
          {
            "field": {
              "Name": "method_c"
            }
          },
          {
            "field": {
              "Name": "status_c"
            }
          }
        ],
        "where": [
          {
            "FieldName": "check_in_time_c",
            "Operator": "RelativeMatch",
            "Values": [targetDate]
          }
        ],
        "orderBy": [
          {
            "fieldName": "check_in_time_c",
            "sorttype": "DESC"
          }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by date:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async getByUserId(userId) {
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
              "Name": "user_id_c"
            }
          },
          {
            "field": {
              "Name": "user_name_c"
            }
          },
          {
            "field": {
              "Name": "check_in_time_c"
            }
          },
          {
            "field": {
              "Name": "check_out_time_c"
            }
          },
          {
            "field": {
              "Name": "method_c"
            }
          },
          {
            "field": {
              "Name": "status_c"
            }
          }
        ],
        "where": [
          {
            "FieldName": "user_id_c",
            "Operator": "EqualTo", 
            "Values": [parseInt(userId)]
          }
        ],
        "orderBy": [
          {
            "fieldName": "check_in_time_c",
            "sorttype": "DESC"
          }
        ]
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by user ID:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async create(record) {
    try {
      const params = {
        records: [
          {
            // Only include Updateable fields
            Name: record.Name || `Attendance ${Date.now()}`,
            user_id_c: parseInt(record.user_id_c || record.userId),
            user_name_c: record.user_name_c || record.userName,
            check_in_time_c: record.check_in_time_c || record.checkInTime,
            check_out_time_c: record.check_out_time_c || record.checkOutTime || null,
            method_c: record.method_c || record.method,
            status_c: record.status_c || record.status
          }
        ]
      }
      
      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create attendance ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating attendance record:", error?.response?.data?.message)
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
            // Only include Updateable fields that are being updated
            ...(updateData.Name !== undefined && { Name: updateData.Name }),
            ...(updateData.user_id_c !== undefined && { user_id_c: parseInt(updateData.user_id_c) }),
            ...(updateData.user_name_c !== undefined && { user_name_c: updateData.user_name_c }),
            ...(updateData.check_in_time_c !== undefined && { check_in_time_c: updateData.check_in_time_c }),
            ...(updateData.check_out_time_c !== undefined && { check_out_time_c: updateData.check_out_time_c }),
            ...(updateData.method_c !== undefined && { method_c: updateData.method_c }),
            ...(updateData.status_c !== undefined && { status_c: updateData.status_c })
          }
        ]
      }
      
      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update attendance ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating attendance record:", error?.response?.data?.message)
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
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete attendance ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting attendance record:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async checkOut(id) {
    try {
      const updateData = {
        check_out_time_c: new Date().toISOString()
      }
      
      return await this.update(id, updateData)
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error checking out attendance record:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }
}

export default new AttendanceService()