import React, { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import StatusIndicator from "@/components/molecules/StatusIndicator"
import ApperIcon from "@/components/ApperIcon"
import { motion } from "framer-motion"

const QRScanner = ({ onScan, isActive = true, className }) => {
  const [status, setStatus] = useState("scanning")
  const [message, setMessage] = useState("Position QR code within the frame")
  const [cameraActive, setCameraActive] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Simulate camera initialization
      const timer = setTimeout(() => {
        setCameraActive(true)
        setStatus("scanning")
        setMessage("Position QR code within the frame")
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setCameraActive(false)
      setStatus("scanning")
      setMessage("Scanner inactive")
    }
  }, [isActive])

  const handleMockScan = () => {
    setStatus("processing")
    setMessage("Processing QR code...")
    
    // Simulate processing delay
    setTimeout(() => {
      const mockUserId = "user_" + Math.random().toString(36).substr(2, 9)
      setStatus("success")
      setMessage("Successfully scanned!")
      
      if (onScan) {
        onScan({
          userId: mockUserId,
          method: "QR Code",
          timestamp: new Date().toISOString()
        })
      }

      // Reset after success
      setTimeout(() => {
        if (isActive) {
          setStatus("scanning")
          setMessage("Position QR code within the frame")
        }
      }, 2000)
    }, 1500)
  }

  return (
    <Card gradient className={cn("overflow-hidden", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">QR Code Scanner</h3>
          <div className={cn(
            "w-3 h-3 rounded-full",
            cameraActive ? "bg-success animate-pulse" : "bg-gray-400"
          )} />
        </div>

        {/* Scanner Frame */}
        <div className="relative mb-6">
          <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden relative">
            {cameraActive ? (
              <>
                {/* Mock camera feed */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-80" />
                <div className="absolute inset-0 qr-scanner-overlay" />
                
                {/* Scanning line */}
                {status === "scanning" && (
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scanner-line opacity-80" />
                )}

                {/* Corner brackets */}
                <div className="absolute inset-4">
                  {/* Top-left */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/60 animate-pulse-corners" />
                  {/* Top-right */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/60 animate-pulse-corners" />
                  {/* Bottom-left */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/60 animate-pulse-corners" />
                  {/* Bottom-right */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/60 animate-pulse-corners" />
                </div>

                {/* Center focus area */}
                <div className="absolute inset-1/4 border border-white/30 rounded-lg" />
                
                {/* Success overlay */}
                {status === "success" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-success/20 flex items-center justify-center"
                  >
                    <div className="bg-white/90 rounded-full p-4 animate-success-scale">
                      <ApperIcon name="Check" className="h-8 w-8 text-success" />
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <ApperIcon name="Camera" className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Camera initializing...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <StatusIndicator 
          status={status} 
          message={message}
          className="mb-4"
        />

        {/* Test Button */}
        <Button 
          onClick={handleMockScan}
          disabled={!cameraActive || status === "processing"}
          className="w-full"
          variant="outline"
        >
          <ApperIcon name="Zap" className="h-4 w-4 mr-2" />
          Test QR Scan
        </Button>
      </div>
    </Card>
  )
}

export default QRScanner