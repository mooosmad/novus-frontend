"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Search, User, Phone, Calendar, Hash, Building } from 'lucide-react'
import Modal from '@/components/Modal'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [formData, setFormData] = useState({
    nom: '',
    codePatient: '',
    telephone: '',
    dateNaissance: '',
    structure: '',
    nd: 'ND'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Recherche:', formData)
    onClose()
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
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8"
              variants={itemVariants}
            >
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Rechercher un Patient
                </h2>
                <p className="text-gray-600">
                  Entrez les informations pour localiser le patient
                </p>
              </motion.div>

              {/* Formulaire */}
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={itemVariants}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nom */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      placeholder="Entrez le nom complet"
                    />
                  </motion.div>

                  {/* Code Patient */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Code Patient
                    </label>
                    <input
                      type="text"
                      value={formData.codePatient}
                      onChange={(e) => handleInputChange('codePatient', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      placeholder="Code patient"
                    />
                  </motion.div>

                  {/* Téléphone */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      placeholder="Numéro de téléphone"
                    />
                  </motion.div>

                  {/* Structure */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Structure
                    </label>
                    <input
                      type="text"
                      value={formData.structure}
                      onChange={(e) => handleInputChange('structure', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      placeholder="Nom de la structure"
                    />
                  </motion.div>

                  {/* Date de Naissance */}
                  <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date de Naissance
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="date"
                        value={formData.dateNaissance}
                        onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      />
                      <select
                        value={formData.nd}
                        onChange={(e) => handleInputChange('nd', e.target.value)}
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="ND">ND</option>
                        <option value="Exact">Exact</option>
                        <option value="Approximatif">Approximatif</option>
                      </select>
                    </div>
                  </motion.div>
                </div>

                {/* Boutons d'action */}
                <motion.div 
                  className="flex gap-4 pt-6"
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
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Search className="w-4 h-4 inline mr-2" />
                    Rechercher
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