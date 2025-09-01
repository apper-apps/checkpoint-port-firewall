class SessionService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'session_c'
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
              "Name": "date_c"
            }
          },
          {
            "field": {
              "Name": "start_time_c"
            }
          },
          {
            "field": {
              "Name": "end_time_c"
            }
          },
          {
            "field": {
              "Name": "total_present_c"
            }
          },
          {
            "field": {
              "Name": "total_registered_c"
            }
          }
        ],
        "pagingInfo": {
          "limit": 100,
          "offset": 0
        },
        "orderBy": [
          {
            "fieldName": "date_c",
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
        console.error("Error fetching sessions:", error?.response?.data?.message)
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
              "Name": "date_c"
            }
          },
          {
            "field": {
              "Name": "start_time_c"
            }
          },
          {
            "field": {
              "Name": "end_time_c"
            }
          },
          {
            "field": {
              "Name": "total_present_c"
            }
          },
          {
            "field": {
              "Name": "total_registered_c"
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
        console.error("Error fetching session:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async getByDate(date) {
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
              "Name": "date_c"
            }
          },
          {
            "field": {
              "Name": "start_time_c"
            }
          },
          {
            "field": {
              "Name": "end_time_c"
            }
          },
          {
            "field": {
              "Name": "total_present_c"
            }
          },
          {
            "field": {
              "Name": "total_registered_c"
            }
          }
        ],
        "where": [
          {
            "FieldName": "date_c",
            "Operator": "EqualTo",
            "Values": [date]
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
        console.error("Error fetching sessions by date:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }

  async create(session) {
    try {
      const params = {
        records: [
          {
            // Only include Updateable fields
            Name: session.Name || `Session ${session.date_c || session.date}`,
            date_c: session.date_c || session.date,
            start_time_c: session.start_time_c || session.startTime,
            end_time_c: session.end_time_c || session.endTime,
            total_present_c: parseInt(session.total_present_c || session.totalPresent || 0),
            total_registered_c: parseInt(session.total_registered_c || session.totalRegistered || 0)
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
          console.error(`Failed to create session ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating session:", error?.response?.data?.message)
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
            ...(updateData.date_c !== undefined && { date_c: updateData.date_c }),
            ...(updateData.start_time_c !== undefined && { start_time_c: updateData.start_time_c }),
            ...(updateData.end_time_c !== undefined && { end_time_c: updateData.end_time_c }),
            ...(updateData.total_present_c !== undefined && { total_present_c: parseInt(updateData.total_present_c) }),
            ...(updateData.total_registered_c !== undefined && { total_registered_c: parseInt(updateData.total_registered_c) })
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
          console.error(`Failed to update session ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating session:", error?.response?.data?.message)
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
          console.error(`Failed to delete session ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting session:", error?.response?.data?.message)
        throw new Error(error.response.data.message)
      } else {
        console.error(error)
        throw error
      }
    }
  }
}

export default new SessionService()