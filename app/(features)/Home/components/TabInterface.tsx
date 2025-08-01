"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import TabNavigation from './TabNavigation'
import TabContent from './TabContent'

export default function TabInterface() {
  const [activeTab, setActiveTab] = useState('overview')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="w-full h-full p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bureau des entrees
        </h1>
        <p className="text-gray-600">
          Gestion des entrees des patients
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="flex justify-center mb-8"
        variants={itemVariants}
      >
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </motion.div>

      {/* Tab Content */}
      <motion.div 
        className="w-full"
        variants={itemVariants}
      >
        <TabContent activeTab={activeTab} />
      </motion.div>
    </motion.div>
  )
} 