"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import ModuleCard from './ModuleCard'

// Données des modules
const modules = [
  {
    id: 'enrolement',
    title: 'Enrôlement',
    description: 'Enregistrement des nouveaux patients',
    icon: '👥',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
    borderColor: 'border-orange-200',
    stats: { patients: 156, today: 12 }
  },
  {
    id: 'rdv',
    title: 'Prise de RDV',
    description: 'Gestion des rendez-vous',
    icon: '📅',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    stats: { appointments: 89, pending: 5 }
  },
  {
    id: 'actes',
    title: 'Actes médicaux',
    description: 'Suivi des interventions',
    icon: '🏥',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    stats: { procedures: 234, today: 8 }
  },
  {
    id: 'facturation',
    title: 'Facturation',
    description: 'Gestion des factures',
    icon: '💰',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    stats: { invoices: 67, pending: 3 }
  },
  {
    id: 'caisse',
    title: 'Caisse',
    description: 'Gestion des paiements',
    icon: '💳',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200',
    stats: { transactions: 123, today: 15 }
  },
  {
    id: 'reports',
    title: 'Rapports',
    description: 'Statistiques et analyses',
    icon: '📊',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
    borderColor: 'border-teal-200',
    stats: { reports: 45, generated: 12 }
  }
]

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['Tous', 'Patients', 'Rendez-vous', 'Finances', 'Administratif']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || 
                          module.title.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div 
      className="flex-1 px-6 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bureau des entrées
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Accédez rapidement à tous vos modules essentiels
          </motion.p>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8"
          variants={itemVariants}
        >
          {/* Catégories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Barre de recherche */}
          <motion.div 
            className="relative flex-1 max-w-md"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="text"
              placeholder="Rechercher un module..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </motion.div>
        </motion.div>

        {/* Grille des modules */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {filteredModules.map((module, index) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Message si aucun résultat */}
        {filteredModules.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Aucun module trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
} 