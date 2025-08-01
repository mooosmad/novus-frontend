"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, User, Clock, Calendar, MessageSquare } from 'lucide-react'
import Modal from '@/components/Modal'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate?: Date | null
  selectedTimeSlot?: string
}

export default function AppointmentModal({ 
  isOpen, 
  onClose, 
  selectedDate, 
  selectedTimeSlot 
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    doctor: 'DOCTOR10',
    appointmentNumber: '0',
    startTime: selectedDate ? 
      `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()} ${selectedTimeSlot || '08'}:00:00` : 
      '01/08/2025 08:00:00',
    duration: '',
    endTime: selectedDate ? 
      `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()} ${selectedTimeSlot || '08'}:30:00` : 
      '01/08/2025 08:30:00',
    description: '',
    reason: '',
    smsMessage: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Appointment data:', formData)
    onClose()
  }

  const handleDelete = () => {
    console.log('Deleting appointment...')
    onClose()
  }

  const handleSendSMS = () => {
    console.log('Sending SMS:', formData.smsMessage)
  }

  const doctors = [
    'DOCTOR1',
    'DOCTOR2',
    'DOCTOR3',
    'DOCTOR4',
    'DOCTOR5',
    'DOCTOR6',
    'DOCTOR7',
    'DOCTOR8',
    'DOCTOR9',
    'DOCTOR10'
  ]

  const durations = [
    '15 minutes',
    '30 minutes',
    '45 minutes',
    '1 heure',
    '1 heure 30',
    '2 heures'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal onClose={onClose} showCloseButton={false}>
          <div className="w-full h-full flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Rendez-vous
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Médecin
                    </label>
                    <select
                      value={formData.doctor}
                      onChange={(e) => handleInputChange('doctor', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      {doctors.map((doctor) => (
                        <option key={doctor} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">RDV</label>
                    <input
                      type="number"
                      value={formData.appointmentNumber}
                      onChange={(e) => handleInputChange('appointmentNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Heure début
                    </label>
                    <input
                      type="text"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="01/08/2025 08:00:00"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Durée</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="">Sélectionner</option>
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Heure fin</label>
                    <input
                      type="text"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="01/08/2025 08:30:00"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description/Patient</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Description du patient ou du rendez-vous"
                    rows={3}
                  />
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Motif de la consultation</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Motif de la consultation"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Supprimer Rendez-vous
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Valider Rendez-vous
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Fermer
                    </button>
                  </div>
                </div>

                {/* SMS Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={formData.smsMessage}
                        onChange={(e) => handleInputChange('smsMessage', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Message SMS"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Numéro de téléphone"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendSMS}
                      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Envoi SMS
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
} 