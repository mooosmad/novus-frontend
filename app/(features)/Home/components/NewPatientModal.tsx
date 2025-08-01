"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { UserPlus, User, Phone, Calendar, Hash, Building, Mail, MapPin, Heart, FileText } from 'lucide-react'
import Modal from '@/components/Modal'

interface NewPatientModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewPatientModal({ isOpen, onClose }: NewPatientModalProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    codePatient: '',
    telephone: '',
    email: '',
    dateNaissance: '',
    adresse: '',
    structure: '',
    groupeSanguin: '',
    notes: '',
    nd: 'ND'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Nouveau patient:', formData)
    onClose()
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal onClose={onClose} showCloseButton={true}>
          <motion.div
            className="w-full h-full flex items-center justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto"
              variants={itemVariants}
            >
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Nouveau Patient
                </h2>
                <p className="text-gray-600">
                  Enregistrez les informations du nouveau patient
                </p>
              </motion.div>

              {/* Formulaire */}
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-8"
                variants={itemVariants}
              >
                {/* Informations personnelles */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations Personnelles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom</label>
                      <input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => handleInputChange('nom', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Nom de famille"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Prénom</label>
                      <input
                        type="text"
                        value={formData.prenom}
                        onChange={(e) => handleInputChange('prenom', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Prénom"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Code Patient
                      </label>
                      <input
                        type="text"
                        value={formData.codePatient}
                        onChange={(e) => handleInputChange('codePatient', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Code patient"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date de Naissance
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          value={formData.dateNaissance}
                          onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                          required
                        />
                        <select
                          value={formData.nd}
                          onChange={(e) => handleInputChange('nd', e.target.value)}
                          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        >
                          <option value="ND">ND</option>
                          <option value="Exact">Exact</option>
                          <option value="Approximatif">Approximatif</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Informations de Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Numéro de téléphone"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Adresse email"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={formData.adresse}
                        onChange={(e) => handleInputChange('adresse', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Adresse complète"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Informations médicales */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Informations Médicales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Structure
                      </label>
                      <input
                        type="text"
                        value={formData.structure}
                        onChange={(e) => handleInputChange('structure', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Nom de la structure"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Groupe Sanguin
                      </label>
                      <select
                        value={formData.groupeSanguin}
                        onChange={(e) => handleInputChange('groupeSanguin', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="">Sélectionner</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Notes médicales
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Notes médicales importantes..."
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Boutons d'action */}
                <motion.div 
                  className="flex gap-4 pt-6 border-t border-gray-200"
                  variants={itemVariants}
                >
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Annuler
                  </motion.button>

                  <motion.button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UserPlus className="w-4 h-4 inline mr-2" />
                    Enregistrer le Patient
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  )
} 