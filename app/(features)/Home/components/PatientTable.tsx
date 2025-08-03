"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Filter, Eye } from 'lucide-react'

interface Patient {
  id: string
  structure: string
  codePatient: string
  nom: string
  prenom: string
  telephone: string
  dateNaissance: string
}

interface PatientTableProps {
  onViewDetails?: (patientId: string) => void
}

// Données de démonstration
const mockPatients: Patient[] = [
  {
    id: '1',
    structure: 'Hôpital Central',
    codePatient: 'P001',
    nom: 'Dupont',
    prenom: 'Jean',
    telephone: '+33 1 23 45 67 89',
    dateNaissance: '1985-03-15'
  },
  {
    id: '2',
    structure: 'Clinique Saint-Joseph',
    codePatient: 'P002',
    nom: 'Martin',
    prenom: 'Marie',
    telephone: '+33 1 98 76 54 32',
    dateNaissance: '1990-07-22'
  },
  {
    id: '3',
    structure: 'Centre Médical',
    codePatient: 'P003',
    nom: 'Bernard',
    prenom: 'Pierre',
    telephone: '+33 1 55 44 33 22',
    dateNaissance: '1978-11-08'
  }
]

export default function PatientTable({ onViewDetails }: PatientTableProps) {
  const [patients] = useState<Patient[]>(mockPatients)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColumns, setSelectedColumns] = useState({
    structure: true,
    codePatient: true,
    nom: true,
    prenom: true,
    telephone: true,
    dateNaissance: true
  })

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

  const filteredPatients = patients.filter(patient =>
    patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.codePatient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.telephone.includes(searchTerm)
  )

  const totalPages = Math.ceil(filteredPatients.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPatients = filteredPatients.slice(startIndex, endIndex)

  const handleViewDetails = (patientId: string) => {
    if (onViewDetails) {
      onViewDetails(patientId)
    }
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Contrôles de filtrage */}
      <motion.div 
        className="p-6 border-b border-gray-100"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Afficher</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value={10}>10 éléments</option>
              <option value={25}>25 éléments</option>
              <option value={50}>50 éléments</option>
              <option value={100}>100 éléments</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filtrer :</span>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div 
        className="overflow-x-auto"
        variants={itemVariants}
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {Object.entries(selectedColumns).map(([key, visible]) => (
                <th key={key} className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={(e) => setSelectedColumns(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    {key === 'structure' && 'Structure'}
                    {key === 'codePatient' && 'Code Patient'}
                    {key === 'nom' && 'Nom'}
                    {key === 'prenom' && 'Prénom(s)'}
                    {key === 'telephone' && 'Téléphone(s)'}
                    {key === 'dateNaissance' && 'Date de naissance'}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentPatients.length > 0 ? (
              currentPatients.map((patient) => (
                <motion.tr
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {selectedColumns.structure && (
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.structure}</td>
                  )}
                  {selectedColumns.codePatient && (
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.codePatient}</td>
                  )}
                  {selectedColumns.nom && (
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.nom}</td>
                  )}
                  {selectedColumns.prenom && (
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.prenom}</td>
                  )}
                  {selectedColumns.telephone && (
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.telephone}</td>
                  )}
                  {selectedColumns.dateNaissance && (
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.dateNaissance}</td>
                  )}
                  <td className="px-6 py-4">
                    <motion.button 
                      className="text-blue hover:text-blue-950 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                      onClick={() => handleViewDetails(patient.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Vue détaillée"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(selectedColumns).length + 1} className="px-6 py-12 text-center text-gray-500">
                  Aucune donnée disponible dans le tableau
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      <motion.div 
        className="p-6 border-t border-gray-100 flex items-center justify-between"
        variants={itemVariants}
      >
        <div className="text-sm text-gray-600">
          Affichage de {startIndex + 1} à {Math.min(endIndex, filteredPatients.length)} sur {filteredPatients.length} entrées
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            
          </button>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
} 