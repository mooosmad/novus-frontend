"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { UserPlus, User, Phone, Building, Heart, FileText, CheckCircle } from 'lucide-react'
import Modal from '@/components/Modal'

interface PatientStepperModalProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { id: 1, title: 'Informations Personnelles', icon: User },
  { id: 2, title: 'Contact & Adresse', icon: Phone },
  { id: 3, title: 'Informations Médicales', icon: Heart },
  { id: 4, title: 'Assurance', icon: Building },
  { id: 5, title: 'Antécédents', icon: FileText }
]

export default function PatientStepperModal({ isOpen, onClose }: PatientStepperModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Informations personnelles
    civilite: 'M.',
    nom: '',
    prenom: '',
    autresPrenoms: '',
    codePatient: '',
    dateNaissance: '',
    sexe: 'Masculin',
    ville: '',
    quartier: '',
    pays: 'Aruba',
    structureOrigine: 'ND',
    medecinTraitant: 'N/D',
    medecinReferant: '',
    sourceReference: '',
    
    // Contact
    mobile1: '',
    mobile2: '',
    telephone1: '',
    telephone2: '',
    email: '',
    personneConfiance: '',
    numeroUrgence: '',
    relationPatient: '',
    identification: '',
    
    // Médical
    groupeSanguin: 'N/D',
    diabetique: false,
    typeDiabete: 'Non diabetique',
    cardiaque: false,
    asthmatique: false,
    allergique: false,
    lateralite: 'N/D',
    
    // Assurance
    assurances: [],
    
    // Antécédents
    profession: '',
    situationEmploi: 'Temps Plein',
    nomPere: '',
    prenomPere: '',
    autresPrenomsPere: '',
    dateNaissancePere: '',
    lieuNaissancePere: '',
    nomMere: '',
    prenomMere: '',
    autresPrenomsMere: '',
    dateNaissanceMere: '',
    lieuNaissanceMere: '',
    paysNaissance: '',
    villeNaissance: '',
    certificatNaissance: '',
    nationalite: '',
    numeroCertificatNationalite: '',
    adresse1: '',
    adresse2: '',
    etat: '',
    tuteur: '',
    pharmaciePreferee: '',
    dateDeces: '',
    raisonDeces: '',
    commentaires: '',
    
    // Antécédents professionnels
    posteActuel: '',
    descriptionPoste: '',
    dateDebut: '',
    dateFin: '',
    bruit: false,
    travailTEV: false,
    ambianceThermique: false,
    gestesRepetitifs: false,
    manutention: false,
    vibrations: false,
    poussiere: false,
    produitsChimiques: false,
    autresRisques: ''
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Patient complet:', formData)
    onClose()
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Informations Personnelles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Civilité</label>
                <select
                  value={formData.civilite}
                  onChange={(e) => handleInputChange('civilite', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="M.">M.</option>
                  <option value="Mme.">Mme.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Nom de famille"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange('prenom', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Prénom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date de naissance</label>
                <input
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sexe</label>
                <select
                  value={formData.sexe}
                  onChange={(e) => handleInputChange('sexe', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Masculin">Masculin</option>
                  <option value="Féminin">Féminin</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ville</label>
                <input
                  type="text"
                  value={formData.ville}
                  onChange={(e) => handleInputChange('ville', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Ville"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Contact & Adresse
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mobile 1</label>
                <input
                  type="tel"
                  value={formData.mobile1}
                  onChange={(e) => handleInputChange('mobile1', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Mobile 1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mobile 2</label>
                <input
                  type="tel"
                  value={formData.mobile2}
                  onChange={(e) => handleInputChange('mobile2', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Mobile 2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Personne de confiance</label>
                <input
                  type="text"
                  value={formData.personneConfiance}
                  onChange={(e) => handleInputChange('personneConfiance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Personne de confiance"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Informations Médicales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Groupe sanguin</label>
                <select
                  value={formData.groupeSanguin}
                  onChange={(e) => handleInputChange('groupeSanguin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="N/D">N/D</option>
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Latéralité</label>
                <select
                  value={formData.lateralite}
                  onChange={(e) => handleInputChange('lateralite', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="N/D">N/D</option>
                  <option value="Droitier">Droitier</option>
                  <option value="Gaucher">Gaucher</option>
                  <option value="Ambidextre">Ambidextre</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.diabetique}
                    onChange={(e) => handleInputChange('diabetique', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Diabétique</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.cardiaque}
                    onChange={(e) => handleInputChange('cardiaque', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Cardiaque</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.asthmatique}
                    onChange={(e) => handleInputChange('asthmatique', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Asthmatique</span>
                </label>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-6 h-6" />
              Assurance
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Assurances</h4>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
              
              <div className="text-center py-8 text-gray-500">
                Aucune assurance enregistrée
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Antécédents Professionnels
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Profession"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Situation d&apos;emploi</label>
                <select
                  value={formData.situationEmploi}
                  onChange={(e) => handleInputChange('situationEmploi', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="Temps Plein">Temps Plein</option>
                  <option value="Temps Partiel">Temps Partiel</option>
                  <option value="Chômage">Chômage</option>
                  <option value="Retraité">Retraité</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Risques professionnels</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'bruit', label: 'Bruit' },
                  { key: 'travailTEV', label: 'Travail TEV' },
                  { key: 'ambianceThermique', label: 'Ambiance Thermique' },
                  { key: 'gestesRepetitifs', label: 'Gestes Répétitifs' },
                  { key: 'manutention', label: 'Manutention' },
                  { key: 'vibrations', label: 'Vibrations' },
                  { key: 'poussiere', label: 'Poussière' },
                  { key: 'produitsChimiques', label: 'Produits Chimiques' }
                ].map((risk) => (
                  <label key={risk.key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData[risk.key as keyof typeof formData] as boolean}
                      onChange={(e) => handleInputChange(risk.key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{risk.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal onClose={onClose} showCloseButton={true}>
          <div className="w-full h-full flex items-center justify-center p-4">
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-8 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Nouveau Patient
                </h2>
                <p className="text-gray-600">
                  Enregistrez les informations complètes du patient
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.id 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 ${
                    currentStep === 1 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Précédent
                </button>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Annuler
                  </button>

                  {currentStep < steps.length ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200"
                    >
                      <UserPlus className="w-4 h-4 inline mr-2" />
                      Créer le Patient
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
} 