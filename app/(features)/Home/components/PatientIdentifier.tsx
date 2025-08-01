"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import SearchModal from './SearchModal'
import PatientStepperModal from './PatientStepperModal'

export default function PatientIdentifier({ShowNewPatientButton = true}: {ShowNewPatientButton?: boolean}) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isPatientStepperOpen, setIsPatientStepperOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <>
      <motion.div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-xl font-bold text-gray-900 mb-6"
          variants={itemVariants}
        >
          Identifier Patient
        </motion.h2>

        <motion.p 
          className="text-gray-600 mb-6"
          variants={itemVariants}
        >
          Utilisez les boutons ci-dessous pour rechercher un patient existant ou enregistrer un nouveau patient.
        </motion.p>

        {/* Boutons d'action */}
        <motion.div 
          className="flex gap-4"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="w-4 h-4" />
            Chercher un Patient
          </motion.button>

          {ShowNewPatientButton && (
            <motion.button
              onClick={() => setIsPatientStepperOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-4 h-4" />
              +Nouveau patient
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Modales */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
      
      <PatientStepperModal 
        isOpen={isPatientStepperOpen} 
        onClose={() => setIsPatientStepperOpen(false)} 
      />
    </>
  )
} 