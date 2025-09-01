import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import CheckInPage from "@/components/pages/CheckInPage"
import DashboardPage from "@/components/pages/DashboardPage"
import ReportsPage from "@/components/pages/ReportsPage"
import SettingsPage from "@/components/pages/SettingsPage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-body">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/check-in" replace />} />
            <Route path="check-in" element={<CheckInPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </BrowserRouter>
  )
}

export default App