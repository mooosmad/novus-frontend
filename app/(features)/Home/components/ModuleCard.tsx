"use client"

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Clock } from 'lucide-react'

interface Module {
  id: string
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
  stats: Record<string, number | undefined>
}

interface ModuleCardProps {
  module: Module
  index: number
}

export default function ModuleCard({ module, index }: ModuleCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1 + 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <motion.div
      className={`relative group cursor-pointer ${module.bgColor} ${module.borderColor} border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white text-xl shadow-lg`}
          variants={iconVariants}
        >
          {module.icon}
        </motion.div>
        
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={{ x: 10 }}
          whileHover={{ x: 0 }}
        >
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
          {module.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {module.description}
        </p>

        {/* Stats */}
        <div className="space-y-2">
          {Object.entries(module.stats).map(([key, value], statIndex) => (
            <motion.div
              key={key}
              className="flex items-center justify-between text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 + statIndex * 0.1 }}
            >
              <span className="text-gray-500 capitalize">
                {key === 'today' ? 'Aujourd\'hui' : key}
              </span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">{value || 0}</span>
                {key === 'today' && (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                )}
                {key === 'pending' && (
                  <Clock className="w-3 h-3 text-orange-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  )
} 