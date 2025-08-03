"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  User, 
  Calendar, 
  Activity,
  FileText,
  Pill,
  Stethoscope,
  History,
  Microscope,
  TrendingUp,
  X,
  ChevronDown,
  Thermometer,
  Weight,
  Heart
} from 'lucide-react'
import Modal from '@/components/Modal'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface ConsultationItem {
  date: string
  motif: string
  interventions: string
}

interface DiagnosticItem {
  dateDiagnostic: string
  finTraitement: string
  codeDiagnostic: string
  description: string
}

interface ConstanteItem {
  date: string
  temperature: string
  tensionGauche: string
  tensionDroite: string
  pouls: string
  poids: string
  imc: string
  oxydation: string
}

interface MedicamentItem {
  dateOrdonnance: string
  dateFinTraitement: string
  medecin: string
  medicament: string
  posologie: string
  indications: string
}

interface ExamenItem {
  dateExamen: string
  medecin: string
  commentaire: string
}

interface AnalyseItem {
  dateAnalyse: string
  categorie: string
  description: string
  archive: string
}

interface PatientOverview {
  id: string
  patient: {
    nom: string
    prenom: string
    age: number
    sexe: string
    dateNaissance: string
    codePatient: string
    groupeSang: string
    medecinReferent: string
    telephone: string
    adresse: string
  }
  consultations: ConsultationItem[]
  diagnostics: DiagnosticItem[]
  constantes: ConstanteItem[]
  medicaments: MedicamentItem[]
  examens: ExamenItem[]
  antecedents: {
    medicaux: string
    chirurgicaux: string
    familiaux: string
    allergiques: string
    gynecoObstetricaux: string
  }
  analyses: AnalyseItem[]
}

interface PatientOverviewModalProps {
  isOpen: boolean
  onClose: () => void
  patientId?: string
}

const mockPatientOverview: PatientOverview = {
  id: '070240',
  patient: {
    nom: 'PATIENT 2',
    prenom: 'NICOLAS',
    age: 40,
    sexe: 'Masculin',
    dateNaissance: '07/02/40',
    codePatient: '070240',
    groupeSang: 'O RH+',
    medecinReferent: 'EMT',
    telephone: '01 00 00 00',
    adresse: 'ABIDJAN, COTE D\'IVOIRE, ABIDJAN'
  },
  consultations: [
    { date: '19/07/2024', motif: '27%', interventions: '1' },
    { date: '19/07/2024', motif: 'xxx', interventions: '2' },
    { date: '02/07/2024', motif: 'Contrôle', interventions: '1' },
    { date: '01/07/2024', motif: 'Consultation', interventions: '1' },
    { date: '19/06/2024', motif: 'Suivi', interventions: '1' },
    { date: '18/06/2024', motif: 'Première visite', interventions: '1' }
  ],
  diagnostics: [
    { dateDiagnostic: '19/07/2024', finTraitement: '19/07/2024', codeDiagnostic: '001', description: '2018: Apres douleurs non confirme par aucun patient, est guerie' },
    { dateDiagnostic: '19/07/2024', finTraitement: '19/07/2024', codeDiagnostic: '002', description: '2018: Apres douleurs non confirme par aucun patient, est guerie' },
    { dateDiagnostic: '19/07/2024', finTraitement: '19/07/2024', codeDiagnostic: '003', description: '2018: Apres douleurs non confirme par aucun patient, est guerie' },
    { dateDiagnostic: '19/07/2024', finTraitement: '19/07/2024', codeDiagnostic: '004', description: '2018: Apres douleurs non confirme par aucun patient, est guerie' },
    { dateDiagnostic: '19/07/2024', finTraitement: '19/07/2024', codeDiagnostic: '005', description: '2018: Apres douleurs non confirme par aucun patient, est guerie' },
    { dateDiagnostic: '19/07/2024', finTraitement: '19/07/2024', codeDiagnostic: '006', description: '2018: Apres douleurs non confirme par aucun patient, est guerie' }
  ],
  constantes: [
    { date: '19/07/2024', temperature: '37.2', tensionGauche: '120/80', tensionDroite: '118/78', pouls: '72', poids: '75', imc: '24.5', oxydation: '98' },
    { date: '02/07/2024', temperature: '36.8', tensionGauche: '125/85', tensionDroite: '123/83', pouls: '75', poids: '74.5', imc: '24.3', oxydation: '99' },
    { date: '01/07/2024', temperature: '37.5', tensionGauche: '130/90', tensionDroite: '128/88', pouls: '80', poids: '75.2', imc: '24.6', oxydation: '97' }
  ],
  medicaments: [
    { dateOrdonnance: '19/07/2024', dateFinTraitement: '26/07/2024', medecin: 'Dr. NICOLAS', medicament: 'PARACETAMOL 500mg', posologie: '2 comprimés par jour', indications: 'Grippe saisonnière' },
    { dateOrdonnance: '02/07/2024', dateFinTraitement: '09/07/2024', medecin: 'Dr. MARTIN', medicament: 'IBUPROFENE 400mg', posologie: '1 comprimé 3x/jour', indications: 'Douleurs articulaires' }
  ],
  examens: [
    { dateExamen: '19/07/2024', medecin: 'Dr. NICOLAS', commentaire: 'Du 19/07/2024, le patient a été examiné par le Dr. NICOLAS. Il a été diagnostiqué avec une grippe saisonnière. Le traitement prescrit est le suivant: PARACETAMOL 500mg, 2 comprimés par jour pendant 5 jours.' }
  ],
  antecedents: {
    medicaux: 'Hypertension artérielle (2018), Diabète type 2 (2020)',
    chirurgicaux: 'Appendicectomie (2015)',
    familiaux: 'Père: diabète, Mère: hypertension',
    allergiques: 'Pénicilline',
    gynecoObstetricaux: 'Non applicable'
  },
  analyses: [
    { dateAnalyse: '19/07/2024', categorie: 'Sang', description: 'Résultat d&apos;analyse de sang', archive: 'PDF' }
  ]
}

export default function PatientOverviewModal({ isOpen, onClose }: PatientOverviewModalProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['consultations']))

  // Chart data for vital signs
  const temperatureData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Température (°C)',
        data: [36.8, 37.2, 36.9, 37.1, 36.7, 37.0],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const bloodPressureData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Tension Systolique',
        data: [120, 125, 118, 122, 119, 121],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Tension Diastolique',
        data: [80, 82, 78, 81, 79, 80],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const weightData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Poids (kg)',
        data: [75, 74.5, 74, 73.8, 73.5, 73.2],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 2,
      },
    ],
  }

  const pulseData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Pouls (b/min)',
        data: [72, 75, 70, 73, 71, 74],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const oxygenData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        data: [98, 97, 99, 98, 97, 98],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.has(sectionId) 
        ? new Set([...prev].filter(id => id !== sectionId))
        : new Set([...prev, sectionId])
    )
  }

  const isExpanded = (sectionId: string) => expandedSections.has(sectionId)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  const sectionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal onClose={onClose} showCloseButton={false}>
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue to-blue-950 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                {/* <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">Vue d'ensemble - Patient</h2>
                  <div className="flex gap-2">
                    <motion.button
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus className="w-4 h-4" />
                      AJOUTER PATIENT
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Edit className="w-4 h-4" />
                      MODIFIER PATIENT
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Trash2 className="w-4 h-4" />
                      SUPPRIMER PATIENT
                    </motion.button>
                  </div>
                </div> */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue" />
                      <span className="text-lg font-semibold text-gray-900">
                        {mockPatientOverview.patient.nom} {mockPatientOverview.patient.prenom}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Âge: {mockPatientOverview.patient.age} ans</p>
                      <p className="text-sm text-gray-600">Sexe: {mockPatientOverview.patient.sexe}</p>
                      <p className="text-sm text-gray-600">Date de naissance: {mockPatientOverview.patient.dateNaissance}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue" />
                      <span className="text-lg font-semibold text-gray-900">
                        N°: {mockPatientOverview.patient.codePatient}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">S. SANG: {mockPatientOverview.patient.groupeSang}</p>
                      <p className="text-sm text-gray-600">DR: {mockPatientOverview.patient.medecinReferent}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {/* <Phone className="w-5 h-5 text-blue" /> */}
                      <span className="text-lg font-semibold text-gray-900">
                        TEL: {mockPatientOverview.patient.telephone}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Commune: {mockPatientOverview.patient.adresse}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Collapsible Sections */}
              {[
                { id: 'consultations', title: 'Consultations antérieures', icon: Calendar, data: mockPatientOverview.consultations },
                { id: 'diagnostics', title: 'Diagnostics antérieurs', icon: Stethoscope, data: mockPatientOverview.diagnostics },
                { id: 'constantes', title: 'Constantes antérieures', icon: Activity, data: mockPatientOverview.constantes },
                { id: 'medicaments', title: 'Médicaments', icon: Pill, data: mockPatientOverview.medicaments },
                { id: 'examens', title: 'Examens', icon: FileText, data: mockPatientOverview.examens },
                { id: 'antecedents', title: 'Antécédents', icon: History, data: mockPatientOverview.antecedents },
                { id: 'analyses', title: 'Analyses', icon: Microscope, data: mockPatientOverview.analyses }
              ].map((section) => (
                <motion.div
                  key={section.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5 text-blue" />
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded(section.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded(section.id) && (
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6">
                          {section.id === 'consultations' && (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Motif de la consultation</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Interventions prescrites</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                  {Array.isArray(section.data) && section.data.map((item: any, index: number) => (
                                    <motion.tr
                                      key={index}
                                      variants={itemVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ delay: index * 0.05 }}
                                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.date}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.motif}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.interventions}</td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {section.id === 'diagnostics' && (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date de diagnostic</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fin de traitement</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Code diagnostic</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description du diagnostic</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                  {Array.isArray(section.data) && section.data.map((item: any, index: number) => (
                                    <motion.tr
                                      key={index}
                                      variants={itemVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ delay: index * 0.05 }}
                                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.dateDiagnostic}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.finTraitement}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.codeDiagnostic}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {section.id === 'constantes' && (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Température (°C)</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tension gauche (mm Hg) / Tension droite (mm Hg)</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pouls (b/min)</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Poids (kg) / IMC (kg/m²)</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Oxydation (%)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                  {Array.isArray(section.data) && section.data.map((item: any, index: number) => (
                                    <motion.tr
                                      key={index}
                                      variants={itemVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ delay: index * 0.05 }}
                                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.date}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.temperature}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.tensionGauche} / {item.tensionDroite}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.pouls}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.poids} / {item.imc}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.oxydation}</td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {section.id === 'medicaments' && (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date ordonnance</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date fin traitement</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Médecin</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Médicament</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Posologie</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Indications</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                  {Array.isArray(section.data) && section.data.map((item: any, index: number) => (
                                    <motion.tr
                                      key={index}
                                      variants={itemVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ delay: index * 0.05 }}
                                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.dateOrdonnance}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.dateFinTraitement}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.medecin}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.medicament}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.posologie}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.indications}</td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {section.id === 'examens' && (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date de l&apos;examen</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Médecin</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Commentaire</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                  {Array.isArray(section.data) && section.data.map((item: any, index: number) => (
                                    <motion.tr
                                      key={index}
                                      variants={itemVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ delay: index * 0.05 }}
                                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.dateExamen}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.medecin}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.commentaire}</td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {section.id === 'antecedents' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Antécédents médicaux</label>
                                  <textarea
                                    value={(section.data as { medicaux: string }).medicaux || ''}
                                    readOnly
                                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Antécédents chirurgicaux</label>
                                  <textarea
                                    value={(section.data as { chirurgicaux: string }).chirurgicaux || ''}
                                    readOnly
                                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Antécédents familiaux</label>
                                  <textarea
                                    value={(section.data as { familiaux: string }).familiaux || ''}
                                    readOnly
                                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                  />
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Antécédents allergiques</label>
                                  <textarea
                                    value={(section.data as { allergiques: string }).allergiques || ''}
                                    readOnly
                                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Antécédents gynéco-obstétricaux</label>
                                  <textarea
                                    value={(section.data as { gynecoObstetricaux: string }).gynecoObstetricaux || ''}
                                    readOnly
                                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {section.id === 'analyses' && (
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date de l&apos;analyse</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Catégorie</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Archive</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                  {Array.isArray(section.data) && section.data.map((item: any, index: number) => (
                                    <motion.tr
                                      key={index}
                                      variants={itemVariants}
                                      initial="hidden"
                                      animate="visible"
                                      transition={{ delay: index * 0.05 }}
                                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.dateAnalyse}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.categorie}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">
                                        <span className="text-red-500">PDF</span>
                                      </td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Charts Section */}
              <motion.div 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue" />
                    DONNÉES VITAUX
                  </h3>
                </div>

                {/* Charts Section */}
                <div className="p-6 space-y-6">
                  {/* Temperature Chart */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      Évolution de la température
                    </h4>
                    <div className="h-64">
                      <Line data={temperatureData} options={chartOptions} />
                    </div>
                  </div>

                  {/* Blood Pressure Chart */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-500" />
                      Évolution de la tension artérielle
                    </h4>
                    <div className="h-64">
                      <Line data={bloodPressureData} options={chartOptions} />
                    </div>
                  </div>

                  {/* Weight Chart */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Weight className="w-4 h-4 text-purple-500" />
                      Évolution du poids
                    </h4>
                    <div className="h-64">
                      <Bar data={weightData} options={chartOptions} />
                    </div>
                  </div>

                  {/* Pulse and Oxygen Charts Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pulse Chart */}
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-orange-500" />
                        Évolution du pouls
                      </h4>
                      <div className="h-48">
                        <Line data={pulseData} options={chartOptions} />
                      </div>
                    </div>

                    {/* Oxygen Saturation Chart */}
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-500" />
                        Saturation en oxygène
                      </h4>
                      <div className="h-48">
                        <Bar data={oxygenData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Action Bar */}
            {/* <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <motion.button
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Patient 2
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Nouveau Patient
                </motion.button>
              </div>
            </div> */}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  )
} 