"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { id: 'accueil', label: 'Accueil', icon: '🏠' },
  { id: 'bureau', label: 'Bureau', icon: '🏢' },
  { id: 'patients', label: 'Patients', icon: '👥' },
  { id: 'rendez-vous', label: 'Rendez-vous', icon: '📅' },
  { id: 'commandes', label: 'Mes Commandes', icon: '📋' },
  { id: 'rapports', label: 'Rapports', icon: '📊' },
  { id: 'config', label: 'Config', icon: '⚙️' },
  { id: 'admin', label: 'Admin', icon: '🔧' },
  { id: 'profil', label: 'Profil', icon: '👤' }
]

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('bureau')

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.nav 
      className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 py-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
              
              {/* Active indicator */}
              {activeTab === item.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
} 