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
  ChevronRight
} from 'lucide-react'

interface SubMenuItem {
  id: string
  label: string
  href?: string
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  subMenu?: SubMenuItem[]
}

const navItems: NavItem[] = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { 
    id: 'bureau', 
    label: 'Bureau', 
    icon: Building,
    subMenu: [
      { id: 'edit-facture', label: 'Éditer une facture', href: '/billing/edit' },
      { id: 'factures', label: 'Factures', href: '/billing/invoices' },
      { id: 'paiements', label: 'Paiements', href: '/billing/payments' }
    ]
  },
  { 
    id: 'patients', 
    label: 'Patients', 
    icon: Users,
    subMenu: [
      { id: 'waiting-patients', label: 'Patients en attente', href: '/patients/waiting' },
      { id: 'add-patient', label: 'Ajouter un Patient', href: '/patients/add' },
      { id: 'consulted-patients', label: 'Patients consultés ce jour', href: '/patients/consulted' }
    ]
  },
  { 
    id: 'rendez-vous', 
    label: 'Rendez-vous', 
    icon: Calendar,
    subMenu: [
      { id: 'take-appointment', label: 'Prise de RDV', href: '/appointments/take' },
      { id: 'appointment-list', label: 'Liste des RDV', href: '/appointments/list' },
      { id: 'sms-reminder', label: 'Rappel RDV SMS', href: '/appointments/sms-reminder' },
      { id: 'cancel-sms', label: 'Annulation RDV SMS', href: '/appointments/cancel-sms' },
      { id: 'doctor-unavailable', label: 'Indisponibilité Médecins', href: '/appointments/unavailable' }
    ]
  },
  { 
    id: 'commandes', 
    label: 'Mes Commandes', 
    icon: ShoppingCart,
    subMenu: [
      { id: 'pending-orders', label: 'Commandes à traiter', href: '/orders/pending' },
      { id: 'completed-orders', label: 'Commandes complétées', href: '/orders/completed' },
      { id: 'cancelled-orders', label: 'Commandes annulées', href: '/orders/cancelled' }
    ]
  },
  { 
    id: 'rapports', 
    label: 'Rapports', 
    icon: FileText,
    subMenu: [
      { id: 'cash-report', label: 'Rapport de caisse', href: '/reports/cash' },
      { id: 'financial-acts', label: 'Rapport financier - Actes', href: '/reports/financial-acts' },
      { id: 'financial-invoices', label: 'Rapport financier - Factures', href: '/reports/financial-invoices' },
      { id: 'cancelled-invoices', label: 'Factures Annulées', href: '/reports/cancelled-invoices' },
      { id: 'clinical-report', label: 'Rapport clinique', href: '/reports/clinical' },
      { id: 'medication-prescribed', label: 'Médicaments prescrits', href: '/reports/medication' },
      { id: 'medication-diagnosis', label: 'Médicaments par diagnostic', href: '/reports/medication-diagnosis' },
      { id: 'work-medicine', label: 'Médecine du travail', href: '/reports/work-medicine' }
    ]
  },
  { 
    id: 'config', 
    label: 'Config', 
    icon: Settings,
    subMenu: [
      { id: 'facilities', label: 'Etablissements', href: '/config/facilities' },
      { id: 'specialties', label: 'Spécialités', href: '/config/specialties' },
      { id: 'medical-acts', label: 'Actes Médicaux', href: '/config/medical-acts' },
      { id: 'analysis-battery', label: 'Batterie d\'analyses', href: '/config/analysis-battery' },
      { id: 'insurance', label: 'Assurances', href: '/config/insurance' },
      { id: 'structures', label: 'Structures', href: '/config/structures' },
      { id: 'code-types', label: 'Code Types', href: '/config/code-types' },
      { id: 'holidays', label: 'Jours Fériés', href: '/config/holidays' },
      { id: 'options', label: 'Options', href: '/config/options' },
      { id: 'templates', label: 'Modèles de Document', href: '/config/templates' }
    ]
  },
  { 
    id: 'admin', 
    label: 'Admin', 
    icon: Shield,
    subMenu: [
      { id: 'users', label: 'Utilisateurs', href: '/admin/users' },
      { id: 'logged-in', label: 'Connexions', href: '/admin/logged-in' },
      { id: 'login-history', label: 'Historique de connexion', href: '/admin/login-history' }
    ]
  },
  { 
    id: 'profil', 
    label: 'Profil', 
    icon: User,
    subMenu: [
      { id: 'manage-profile', label: 'Gérer mon profil', href: '/profile/manage' },
      { id: 'service-locations', label: 'Gérer mes lieux de services', href: '/profile/service-locations' }
    ]
  }
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('accueil')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const containerVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  const subMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 }
  }

  const toggleSubMenu = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isExpanded = (itemId: string) => expandedItems.includes(itemId)

  // Function to get parent item for a submenu item
  const getParentItem = (subItemId: string) => {
    for (const item of navItems) {
      if (item.subMenu) {
        const found = item.subMenu.find(subItem => subItem.id === subItemId)
        if (found) {
          return item.id
        }
      }
    }
    return null
  }

  // Function to check if current active item is a submenu item
  const isActiveSubmenuItem = (itemId: string) => {
    return getParentItem(itemId) !== null
  }

  // Function to get the display item (parent if collapsed and active item is submenu)
  const getDisplayItem = (itemId: string) => {
    if (isCollapsed && isActiveSubmenuItem(itemId)) {
      return getParentItem(itemId) || itemId
    }
    return itemId
  }

  return (
    <motion.div
      className="h-screen bg-white/90 backdrop-blur-sm border-r border-gray-200/50 shadow-lg relative"
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
            {/* <div className="w-12 h-12 bg-blue-950 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              MK
            </div> */}
            <div className="absolute -bottom-2 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              {/* <h3 className="font-semibold text-gray-900">Sangare MHD</h3> */}
              <p className="text-sm text-gray-500">Session ends in 9 min 5 s</p>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto pb-16">
          {navItems.map((item, index) => {
            const displayItemId = getDisplayItem(activeItem)
            const isActive = displayItemId === item.id
            
            return (
              <div key={item.id}>
                <motion.button
                  onClick={() => {
                    if (item.subMenu) {
                      toggleSubMenu(item.id)
                    } else {
                      setActiveItem(item.id)
                    }
                  }}
                  className={`relative w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
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
                  </div>

                  {/* Chevron for items with submenu */}
                  {item.subMenu && !isCollapsed && (
                    <motion.div
                      animate={{ rotate: isExpanded(item.id) ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>

                {/* Submenu */}
                {item.subMenu && !isCollapsed && (
                  <motion.div
                    variants={subMenuVariants}
                    initial="hidden"
                    animate={isExpanded(item.id) ? "visible" : "hidden"}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-1 space-y-1 mb-2">
                      {item.subMenu.map((subItem, subIndex) => (
                        <motion.button
                          key={subItem.id}
                          onClick={() => setActiveItem(subItem.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                            activeItem === subItem.id
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                          }`}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.1 + subIndex * 0.02 }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          <span className="font-medium">{subItem.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue transition-colors"
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