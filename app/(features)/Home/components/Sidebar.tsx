"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Home, 
  Building, 
  Users, 
  Calendar, 
  ShoppingCart, 
  FileText, 
  Settings,
  Shield,
  User,
  LogOut
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const navItems: NavItem[] = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { id: 'bureau', label: 'Bureau', icon: Building },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'rendez-vous', label: 'Rendez-vous', icon: Calendar },
  { id: 'commandes', label: 'Mes Commandes', icon: ShoppingCart },
  { id: 'rapports', label: 'Rapports', icon: FileText },
  { id: 'config', label: 'Config', icon: Settings },
  { id: 'admin', label: 'Admin', icon: Shield },
  { id: 'profil', label: 'Profil', icon: User }
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('accueil')
  const [isCollapsed, setIsCollapsed] = useState(false)


  const containerVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      className="h-full bg-white/90 backdrop-blur-sm border-r border-gray-200/50 shadow-lg"
      variants={containerVariants}
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >

<motion.div
          className="mb-6 px-3"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <img 
              src="/medic.png" 
              width={500}
              height={500}
              alt="Medical Logo"
              className="w-full h-full rounded-xl object-contain"
            />
          </div>
        </motion.div>

      <div className="flex flex-col h-full p-4">
        {/* Avatar Section */}
        <motion.div 
          className="flex items-center gap-3 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-blue-950 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              MK
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              <h3 className="font-semibold text-gray-900">Michał Kowalski</h3>
              <p className="text-sm text-gray-500">Session ends in 9 min 5 s</p>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                activeItem === item.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>
              
              {!isCollapsed && (
                <motion.span
                  className="font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.label}
                </motion.span>
              )}

              {/* Active indicator */}
              {activeItem === item.id && (
                <motion.div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}

          {/* Bottom Section */}
        <motion.div 
          className="pt-4 border-t border-gray-200/50"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <motion.span
                className="font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                
              >
                
                Déconnexion
              </motion.span>
            )}
          </button>
        </motion.div>
        </nav>

        {/* Language Selector */}
       

        

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ←
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  )
} 