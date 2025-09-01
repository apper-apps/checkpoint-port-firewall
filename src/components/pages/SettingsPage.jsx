import React, { useState } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    scannerEnabled: true,
    rfidEnabled: true,
    faceRecognitionEnabled: false,
    manualCheckInEnabled: true,
    attendanceGracePeriod: "15",
    workingHoursStart: "09:00",
    workingHoursEnd: "17:00",
    autoCheckOut: false,
    notifications: true,
    soundAlerts: true
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Settings saved successfully!")
    setLoading(false)
  }

  const handleReset = () => {
    setSettings({
      scannerEnabled: true,
      rfidEnabled: true,
      faceRecognitionEnabled: false,
      manualCheckInEnabled: true,
      attendanceGracePeriod: "15",
      workingHoursStart: "09:00",
      workingHoursEnd: "17:00",
      autoCheckOut: false,
      notifications: true,
      soundAlerts: true
    })
    toast.info("Settings reset to defaults")
  }

  const ToggleSwitch = ({ id, checked, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <label htmlFor={id} className="font-medium text-gray-900 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        id={id}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          checked ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Configure attendance tracking methods and system preferences
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Check-in Methods */}
        <Card gradient className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Scan" className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Check-in Methods</h2>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              id="scanner"
              checked={settings.scannerEnabled}
              onChange={(value) => setSettings({...settings, scannerEnabled: value})}
              label="QR Code Scanner"
              description="Enable QR code scanning for check-ins"
            />
            <ToggleSwitch
              id="rfid"
              checked={settings.rfidEnabled}
              onChange={(value) => setSettings({...settings, rfidEnabled: value})}
              label="RFID Card Reader"
              description="Enable RFID card scanning for check-ins"
            />
            <ToggleSwitch
              id="faceRecognition"
              checked={settings.faceRecognitionEnabled}
              onChange={(value) => setSettings({...settings, faceRecognitionEnabled: value})}
              label="Facial Recognition"
              description="Enable facial recognition for check-ins"
            />
            <ToggleSwitch
              id="manual"
              checked={settings.manualCheckInEnabled}
              onChange={(value) => setSettings({...settings, manualCheckInEnabled: value})}
              label="Manual Check-in"
              description="Allow manual check-ins with user ID entry"
            />
          </div>
        </Card>

        {/* Attendance Rules */}
        <Card gradient className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-success/10 to-success/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" className="h-5 w-5 text-success" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Attendance Rules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="Grace Period (minutes)"
              id="gracePeriod"
            >
              <Select
                value={settings.attendanceGracePeriod}
                onChange={(e) => setSettings({...settings, attendanceGracePeriod: e.target.value})}
              >
                <option value="0">No grace period</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </Select>
            </FormField>

            <FormField 
              label="Working Hours Start"
              id="workStart"
              type="time"
              value={settings.workingHoursStart}
              onChange={(e) => setSettings({...settings, workingHoursStart: e.target.value})}
            />

            <FormField 
              label="Working Hours End"
              id="workEnd"
              type="time"
              value={settings.workingHoursEnd}
              onChange={(e) => setSettings({...settings, workingHoursEnd: e.target.value})}
            />

            <div className="md:col-span-2">
              <ToggleSwitch
                id="autoCheckOut"
                checked={settings.autoCheckOut}
                onChange={(value) => setSettings({...settings, autoCheckOut: value})}
                label="Automatic Check-out"
                description="Automatically check out users at end of working hours"
              />
            </div>
          </div>
        </Card>

        {/* System Preferences */}
        <Card gradient className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-info/10 to-info/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="Settings" className="h-5 w-5 text-info" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">System Preferences</h2>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              id="notifications"
              checked={settings.notifications}
              onChange={(value) => setSettings({...settings, notifications: value})}
              label="Push Notifications"
              description="Receive notifications for check-ins and system events"
            />
            <ToggleSwitch
              id="soundAlerts"
              checked={settings.soundAlerts}
              onChange={(value) => setSettings({...settings, soundAlerts: value})}
              label="Sound Alerts"
              description="Play sounds for successful check-ins and errors"
            />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader" className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
          >
            <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SettingsPage