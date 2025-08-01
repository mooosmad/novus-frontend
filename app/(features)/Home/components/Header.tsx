"use client"

import { motion } from 'framer-motion'
import { Bell, User, LogOut, Globe } from 'lucide-react'

export default function Header() {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.header 
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Patient info */}
        <motion.div 
          className="flex items-center gap-4"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              10 patient(s)
            </span>
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-sm text-red-600 font-medium">
            tp: 838:59:59
          </span>
        </motion.div>

        {/* Right side - User actions */}
        <motion.div 
          className="flex items-center gap-4"
          variants={itemVariants}
        >
          {/* Welcome message */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>Bienvenue <span className="font-medium">MEDICAL DOCTOR</span>!</span>
          </div>

          {/* Language selector */}
          <motion.div 
            className="flex items-center gap-1 bg-gray-100 rounded-lg p-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-white rounded-md shadow-sm">
              FR
            </button>
            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">
              EN
            </button>
          </motion.div>

          {/* Notifications */}
          <motion.button
            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </motion.button>

          {/* Logout */}
          <motion.button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Quitter</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  )
} 