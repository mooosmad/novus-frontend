"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import PatientOverviewModal from './PatientOverviewModal'
import { 
  User, 
  Calendar, 
  Weight, 
  Eye,
  Edit,
  X,
  Printer
} from 'lucide-react'
import Modal from '@/components/Modal'

interface InvoiceDetail {
  id: string
  patient: {
    nom: string
    prenom: string
    age: number
    sexe: string
    groupeSang: string
    codePatient: string
    telephone: string
    adresse: string
  }
  constants: {
    date: string
    tensionSystolique: string
    tensionDiastolique: string
    pouls: string
    temperature: string
    poids: string
  }
  invoiceItems: {
    dateFacturation: string
    medecin: string
    prestation: string
    coutPrestation: number
    tauxAssurance: number
    montantAPayer: number
  }[]
}

interface InvoiceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceId?: string
}

const mockInvoiceDetail: InvoiceDetail = {
  id: '163',
  patient: {
    nom: 'PATIENT 2',
    prenom: 'NICOLAS',
    age: 45,
    sexe: 'Masculin',
    groupeSang: '',
    codePatient: '070240',
    telephone: '+225 01234567',
    adresse: 'Abidjan, Côte d\'Ivoire'
  },
  constants: {
    date: '16/07/2025',
    tensionSystolique: '0089',
    tensionDiastolique: '097',
    pouls: '120.0',
    temperature: '38.00',
    poids: '78'
  },
  invoiceItems: [
    {
      dateFacturation: '16/07/2025',
      medecin: 'DOCTOR10',
      prestation: 'Consultation Allergologie',
      coutPrestation: 25000,
      tauxAssurance: 90,
      montantAPayer: 2500
    },
    {
      dateFacturation: '16/07/2025',
      medecin: 'DOCTOR2',
      prestation: 'Consultation Cardiologie',
      coutPrestation: 20000,
      tauxAssurance: 90,
      montantAPayer: 2000
    }
  ]
}

export default function InvoiceDetailModal({ isOpen, onClose }: InvoiceDetailModalProps) {
  const [invoiceDetail] = useState<InvoiceDetail>(mockInvoiceDetail)
  const [activeTab, setActiveTab] = useState<'overview' | 'archives' | 'appointments'>('overview')

  const [isPatientOverviewOpen, setIsPatientOverviewOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal onClose={onClose} showCloseButton={false}>
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue to-blue-950 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">Information du patient</h2>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => {
                        setActiveTab('overview')
                        setIsPatientOverviewOpen(true)
                      }}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'overview' 
                          ? 'bg-white text-blue' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Vue d&apos;ensemble
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setActiveTab('archives')
                      }}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'archives' 
                          ? 'bg-white text-blue' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Archives
                    </motion.button>
                    <motion.button
                      onClick={() => setActiveTab('appointments')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'appointments' 
                          ? 'bg-white text-blue' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Rendez-vous
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <motion.div 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Informations du patient</h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Patient Details */}
                    <div className="space-y-4">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nom complet
                        </label>
                        <p className="text-2xl font-bold text-gray-900">
                          {invoiceDetail.patient.nom} {invoiceDetail.patient.prenom}
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Âge / Sexe</label>
                        <p className="text-lg text-gray-900">
                          {invoiceDetail.patient.age} {invoiceDetail.patient.sexe}
                        </p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Code Patient</label>
                        <p className="text-lg font-medium text-gray-900">
                          {invoiceDetail.patient.codePatient}
                        </p>
                      </motion.div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Adresse
                        </label>
                        <p className="text-lg text-gray-900">{invoiceDetail.patient.adresse}</p>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-gray-600">Groupe sanguin</label>
                        <p className="text-lg text-gray-900">
                          {invoiceDetail.patient.groupeSang || 'Non renseigné'}
                        </p>
                      </motion.div>
                    </div>

                    {/* Vital Signs */}
                    <div className="space-y-4">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Constantes ({invoiceDetail.constants.date})
                        </label>
                        <p className="text-sm text-gray-600">
                          PA {invoiceDetail.constants.tensionSystolique}/{invoiceDetail.constants.tensionDiastolique} 
                          P={invoiceDetail.constants.pouls} T={invoiceDetail.constants.temperature}
                        </p>
                      </motion.div>

                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">S: {invoiceDetail.constants.tensionSystolique}</span>
                          <span className="text-sm text-gray-600">D: {invoiceDetail.constants.tensionDiastolique}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Weight className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-600">{invoiceDetail.constants.poids} kg</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-600">t°: {invoiceDetail.constants.temperature}</span>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Invoice Details */}
              <motion.div 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Détails de la facture</h3>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date facturation</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Médecin</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prestation</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cout prestation</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Taux assurance(%)</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Montant à payer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceDetail.invoiceItems.map((item, index) => (
                          <motion.tr
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm text-gray-900">{item.dateFacturation}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.medecin}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.prestation}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                              {item.coutPrestation.toLocaleString()} F CFA
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.tauxAssurance}%</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                              {item.montantAPayer.toLocaleString()} F CFA
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                    <motion.button
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Annuler Facture
                    </motion.button>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input type="checkbox" className="rounded" />
                          Sans entête
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input type="checkbox" className="rounded" />
                          Format A5
                        </label>
                      </div>
                      <motion.button
                        className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-950 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Printer className="w-4 h-4" />
                        Imprimer
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Modal>
      )}
     { <PatientOverviewModal isOpen={isPatientOverviewOpen} onClose={() => {
        setIsPatientOverviewOpen(false)
        setActiveTab('overview')
      }} />}
    </AnimatePresence>
  )
}   