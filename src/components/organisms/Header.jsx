import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "@/App";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logout } = useContext(AuthContext)

  const navigation = [
    { name: "Check-in", href: "/check-in", icon: "Scan" },
    { name: "Dashboard", href: "/dashboard", icon: "BarChart3" },
    { name: "Reports", href: "/reports", icon: "FileText" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ]

  const isActive = (href) => location.pathname === href

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200">
<ApperIcon name="Bot" className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CheckPoint Pro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100",
                    isActive(item.href)
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                      : "text-gray-700 hover:text-gray-900"
                  )}
                >
                  <ApperIcon name={item.icon} className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
))}
            </nav>
            {/* Logout Button */}
            <div className="hidden md:flex items-center ml-4">
              <Button
                variant="ghost"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="LogOut" className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display font-bold text-lg">Menu</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </Button>
                </div>
                
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive(item.href)
                          ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
<ApperIcon name={item.icon} className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
))}
                  
                  {/* Mobile Logout Button */}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      logout()
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 justify-start"
                  >
                    <ApperIcon name="LogOut" className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header