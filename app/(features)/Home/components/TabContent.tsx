"use client"

import { motion, AnimatePresence } from 'framer-motion'
import PatientIdentifier from './PatientIdentifier'
import PatientTable from './PatientTable'
import Calendar from './Calendar'

interface TabContentProps {
  activeTab: string
}

export default function TabContent({ activeTab }: TabContentProps) {
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.3
      }
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            key="enrolement"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6 w-full"
          >
            {/* Formulaire d'identification */}
            <PatientIdentifier />
            
            {/* Table des patients */}
            <PatientTable />
          </motion.div>
        )
      
      case 'portfolios':
        return (
          <motion.div
            key="rdv"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <Calendar />
          </motion.div>
        )
      
      case 'documents':
        return (
          <motion.div
            key="actes"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
             {/* Formulaire d'identification */}
             <PatientIdentifier ShowNewPatientButton={false}/>
            
            {/* Table des patients */}
            <PatientTable />
          </motion.div>
        )
      
      case 'communication':
        return (
          <motion.div
            key="facturation"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            Fonctionnalité en cours de développement
          </motion.div>
        )

      case 'caisse':
        return (
          <motion.div
            key="caisse"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            Fonctionnalité en cours de développement
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <AnimatePresence mode="wait">
      {renderContent()}
    </AnimatePresence>
  )
} 