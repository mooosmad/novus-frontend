"use client"

import { motion, AnimatePresence } from 'framer-motion'
import PatientIdentifier from './PatientIdentifier'
import PatientTable from './PatientTable'
import Calendar from './Calendar'
import MedicalActsTable from './MedicalActsTable'
import BillingTable from './BillingTable'
import InvoiceDetailModal from './InvoiceDetailModal'
import PatientOverviewModal from './PatientOverviewModal'
import CaisseTable from './CaisseTable'
import CaisseDetailModal from './CaisseDetailModal'
import { useState } from 'react'

interface TabContentProps {
  activeTab: string
}

export default function TabContent({ activeTab }: TabContentProps) {
  const [isInvoiceDetailOpen, setIsInvoiceDetailOpen] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null)
  const [isPatientOverviewOpen, setIsPatientOverviewOpen] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [isCaisseDetailOpen, setIsCaisseDetailOpen] = useState(false)
  const [selectedCaisseInvoiceId, setSelectedCaisseInvoiceId] = useState<string | null>(null)

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const handleViewInvoiceDetail = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId)
    setIsInvoiceDetailOpen(true)
  }

  const handleViewPatientOverview = (patientId: string) => {
    setSelectedPatientId(patientId)
    setIsPatientOverviewOpen(true)
  }

  const handleViewCaisseDetail = (invoiceId: string) => {
    setSelectedCaisseInvoiceId(invoiceId)
    setIsCaisseDetailOpen(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div key="enrolement" 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <PatientIdentifier />
            <PatientTable onViewDetails={handleViewPatientOverview} />
          </motion.div>
        )
      case 'portfolios':
        return (
          <motion.div key="rdv" 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Calendar />
          </motion.div>
        )
      case 'documents':
        return (
          <motion.div key="actes" 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <MedicalActsTable />
          </motion.div>
        )
      case 'billing':
        return (
          <motion.div key="billing" 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <BillingTable onViewDetails={handleViewInvoiceDetail} />
          </motion.div>
        )
      case 'caisse':
        return (
          <motion.div key="caisse" 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CaisseTable onViewDetails={handleViewCaisseDetail} />
          </motion.div>
        )
      default: return null
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      {/* Modal de détails de facture */}
      <InvoiceDetailModal
        isOpen={isInvoiceDetailOpen}
        onClose={() => setIsInvoiceDetailOpen(false)}
        invoiceId={selectedInvoiceId || undefined}
      />

      {/* Modal de vue d'ensemble du patient */}
      <PatientOverviewModal
        isOpen={isPatientOverviewOpen}
        onClose={() => setIsPatientOverviewOpen(false)}
        patientId={selectedPatientId || undefined}
      />

      {/* Modal de détails de caisse */}
      <CaisseDetailModal
        isOpen={isCaisseDetailOpen}
        onClose={() => setIsCaisseDetailOpen(false)}
        invoiceId={selectedCaisseInvoiceId || undefined}
      />
    </>
  )
} 