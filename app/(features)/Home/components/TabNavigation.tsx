"use client"

import { motion } from 'framer-motion'

interface TabItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

const tabItems: TabItem[] = [
  { id: 'overview', label: 'Enrôlement' },
  { id: 'portfolios', label: 'Prise de RDV' },
  { id: 'documents', label: 'Actes médicaux' },
  { id: 'communication', label: 'Facturation' },
  { id: 'caisse', label: 'Caisse' },
]

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <motion.div 
      className="bg-slate-100 rounded-full p-1 inline-flex"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tabItems.map((item, index) => (
        <motion.button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === item.id
              ? 'text-gray-900 bg-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Active indicator */}
          {activeTab === item.id && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              layoutId="activeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          {/* Content */}
          <motion.span
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            {item.label}
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  )
} 