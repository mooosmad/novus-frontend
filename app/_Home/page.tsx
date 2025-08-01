"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../(features)/Home/components/Sidebar'
import TabInterface from '../(features)/Home/components/TabInterface'

export default function Home() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex h-screen">
        <Sidebar />
        
        <div className="flex-1 overflow-auto w-full h-full">
          <TabInterface />
        </div>
      </div>
    </motion.div>
  )
} 