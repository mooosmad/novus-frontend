"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  Heart, 
  Thermometer, 
  Weight, 
  Activity,
  FileText,
  DollarSign,
  CreditCard,
  CheckCircle,
  Smartphone,
  Eye,
  Edit,
  Plus,
  Trash2,
  X,
  Printer,
  Wallet,
  CheckSquare
} from 'lucide-react'
import Modal from '@/components/Modal'
import PatientOverviewModal from './PatientOverviewModal'

interface PaymentDetail {
  paymentNumber: string
  paymentDate: string
  invoiceNumber: string
  amountPaid: number
  paymentMethod: string
}

interface InvoiceItem {
  date: string
  service: string
  cost: number
  insuranceRate: number
  amountToPay: number
}

interface CaisseDetail {
  invoiceId: string
  patient: {
    id: string
    name: string
    firstName: string
    age: number
    gender: string
    patientCode: string
    bloodGroup: string
    vitalSigns: {
      bloodPressure: string
      pulse: string
      temperature: string
      weight: string
    }
  }
  invoiceItems: InvoiceItem[]
  payments: PaymentDetail[]
  initialAmount: number
  remainingAmount: number
}

interface CaisseDetailModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceId?: string
}

const mockCaisseDetail: CaisseDetail = {
  invoiceId: '163',
  patient: {
    id: '070240',
    name: 'PATIENT 2',
    firstName: 'NICOLAS',
    age: 45,
    gender: 'Masculin',
    patientCode: '070240',
    bloodGroup: '',
    vitalSigns: {
      bloodPressure: '0089/097',
      pulse: '120.0',
      temperature: '38.00',
      weight: '78'
    }
  },
  invoiceItems: [
    {
      date: '16/07/2025',
      service: 'Consultation Allergologie',
      cost: 25000,
      insuranceRate: 90,
      amountToPay: 2500
    },
    {
      date: '16/07/2025',
      service: 'Consultation Cardiologie',
      cost: 20000,
      insuranceRate: 90,
      amountToPay: 2000
    }
  ],
  payments: [
    {
      paymentNumber: '150',
      paymentDate: '16/07/2025',
      invoiceNumber: 'MEDICF163',
      amountPaid: 1000,
      paymentMethod: 'PAIEMENT ESPECES'
    },
    {
      paymentNumber: '149',
      paymentDate: '16/07/2025',
      invoiceNumber: 'MEDICF163',
      amountPaid: 1500,
      paymentMethod: 'PAIEMENT ESPECES'
    },
    {
      paymentNumber: '150',
      paymentDate: '16/07/2025',
      invoiceNumber: 'F163',
      amountPaid: 1000,
      paymentMethod: 'PAIEMENT ESPECES'
    },
    {
      paymentNumber: '149',
      paymentDate: '16/07/2025',
      invoiceNumber: 'F163',
      amountPaid: 1500,
      paymentMethod: 'PAIEMENT ESPECES'
    },
    {
      paymentNumber: '150',
      paymentDate: '16/07/2025',
      invoiceNumber: 'DZF163',
      amountPaid: 1000,
      paymentMethod: 'PAIEMENT ESPECES'
    },
    {
      paymentNumber: '149',
      paymentDate: '16/07/2025',
      invoiceNumber: 'DZF163',
      amountPaid: 1500,
      paymentMethod: 'PAIEMENT ESPECES'
    }
  ],
  initialAmount: 4500,
  remainingAmount: 2000
}

export default function CaisseDetailModal({ isOpen, onClose, invoiceId }: CaisseDetailModalProps) {
  const [caisseDetail] = useState<CaisseDetail>(mockCaisseDetail)
  const [amountToPay, setAmountToPay] = useState('')
  const [paymentReference, setPaymentReference] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [isPatientOverviewOpen, setIsPatientOverviewOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'archives' | 'appointments' | null>(null)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  const totalPaid = caisseDetail.payments.reduce((sum, payment) => sum + payment.amountPaid, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal onClose={onClose} showCloseButton={false}>
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">Détails de Paiement - Facture #{caisseDetail.invoiceId}</h2>
                  <div className="flex gap-2">
                    <motion.button
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab('overview')
                        setIsPatientOverviewOpen(true)
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Vue d'ensemble
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab('archives')
                        setIsPatientOverviewOpen(true)
                      }}
                    >
                      <FileText className="w-4 h-4" />
                      Archives
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab('appointments')
                        setIsPatientOverviewOpen(true)
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                      Rendez-vous
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab('appointments')
                        setIsPatientOverviewOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
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
                className="bg-gray-50 rounded-xl p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-gray-900">
                        {caisseDetail.patient.name} {caisseDetail.patient.firstName}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Âge: {caisseDetail.patient.age} ans</p>
                      <p className="text-sm text-gray-600">Sexe: {caisseDetail.patient.gender}</p>
                      <p className="text-sm text-gray-600">Code: {caisseDetail.patient.patientCode}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-gray-900">Constantes (16/07/2025)</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">PA: {caisseDetail.patient.vitalSigns.bloodPressure}</p>
                      <p className="text-sm text-gray-600">P: {caisseDetail.patient.vitalSigns.pulse}</p>
                      <p className="text-sm text-gray-600">T: {caisseDetail.patient.vitalSigns.temperature}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Weight className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-gray-900">Poids</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{caisseDetail.patient.vitalSigns.weight} kg</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-gray-900">Température</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{caisseDetail.patient.vitalSigns.temperature}°C</p>
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
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Détails de la facture</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date facturation</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prestation</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cout prestation</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Taux assurance</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Montant à payer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caisseDetail.invoiceItems.map((item, index) => (
                        <motion.tr
                          key={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.service}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.cost.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.insuranceRate}%</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{item.amountToPay.toLocaleString()}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Payment Summary */}
              <motion.div 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Récapitulatif paiement Facture N° : {caisseDetail.invoiceId}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">Montant initial</h4>
                      <p className="text-2xl font-bold text-blue-900">{caisseDetail.initialAmount.toLocaleString()} F CFA</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-green-900 mb-2">Montant payé</h4>
                      <p className="text-2xl font-bold text-green-900">{totalPaid.toLocaleString()} F CFA</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-red-900 mb-2">Reste à verser</h4>
                      <p className="text-2xl font-bold text-red-900">{caisseDetail.remainingAmount.toLocaleString()} F CFA</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">N° de paiement</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date de paiement</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">N° Facture</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Montant versé</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mode de Paiement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {caisseDetail.payments.map((payment, index) => (
                          <motion.tr
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm text-gray-900">{payment.paymentNumber}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{payment.paymentDate}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{payment.invoiceNumber}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{payment.amountPaid.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{payment.paymentMethod}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Sans entête</span>
                    </label>
                    <motion.button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Printer className="w-4 h-4" />
                      Imprimer
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Payment Form */}
              <motion.div 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Paiement facture</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Montant à verser (F CFA)
                      </label>
                      <input
                        type="number"
                        value={amountToPay}
                        onChange={(e) => setAmountToPay(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Banque et référence (Carte / chèque) ou Numéro de téléphone
                      </label>
                      <input
                        type="text"
                        value={paymentReference}
                        onChange={(e) => setPaymentReference(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Ex:Banque / 214555"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Mode de paiement</label>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { id: 'cash', icon: Wallet, label: 'Espèces', color: 'bg-green-500' },
                        { id: 'card', icon: CreditCard, label: 'Carte', color: 'bg-blue-500' },
                        { id: 'check', icon: CheckSquare, label: 'Chèque de banque', color: 'bg-purple-500' },
                        { id: 'orange', icon: Smartphone, label: 'Orange Money', color: 'bg-orange-500' },
                        { id: 'mtn', icon: Smartphone, label: 'MTN Money', color: 'bg-yellow-500' },
                        { id: 'wave', icon: Smartphone, label: 'Wave', color: 'bg-teal-500' }
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                            selectedPaymentMethod === method.id
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <method.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{method.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <motion.button
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <DollarSign className="w-4 h-4" />
                      Effectuer le paiement
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Modal>
      )}
     { <PatientOverviewModal isOpen={isPatientOverviewOpen} onClose={() => {setIsPatientOverviewOpen(false),setActiveTab(null)}} />}

    </AnimatePresence>
  )
} 