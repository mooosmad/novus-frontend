"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

interface MedicalAct {
  id: string
  structure: string
  codePatient: string
  nom: string
  prenoms: string
  nomMere: string
  telephone: string
  dateNaissance: string
  derniereConsultation: string
}

const mockData: MedicalAct[] = [
  {
    id: '1',
    structure: 'Centre Médical Principal',
    codePatient: 'PAT001',
    nom: 'Dupont',
    prenoms: 'Marie',
    nomMere: 'Martin',
    telephone: '+225 01234567',
    dateNaissance: '15/03/1985',
    derniereConsultation: '20/12/2024'
  },
  {
    id: '2',
    structure: 'Clinique Saint-Jean',
    codePatient: 'PAT002',
    nom: 'Koné',
    prenoms: 'Fatou',
    nomMere: 'Traoré',
    telephone: '+225 02345678',
    dateNaissance: '22/07/1990',
    derniereConsultation: '18/12/2024'
  },
  {
    id: '3',
    structure: 'Hôpital Général',
    codePatient: 'PAT003',
    nom: 'Ouattara',
    prenoms: 'Amadou',
    nomMere: 'Coulibaly',
    telephone: '+225 03456789',
    dateNaissance: '08/11/1978',
    derniereConsultation: '15/12/2024'
  }
]

const columns = [
  { key: 'structure', label: 'Structure', sortable: true },
  { key: 'codePatient', label: 'Code Patient', sortable: true },
  { key: 'nom', label: 'Nom', sortable: true },
  { key: 'prenoms', label: 'Prénom(s)', sortable: true },
  { key: 'nomMere', label: 'Nom de la mère', sortable: true },
  { key: 'telephone', label: 'Telephone(s)', sortable: true },
  { key: 'dateNaissance', label: 'Date de naissance', sortable: true },
  { key: 'derniereConsultation', label: 'Dernière consultation', sortable: true }
]

export default function MedicalActsTable() {
  const [data, setData] = useState<MedicalAct[]>(mockData)
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(columns.map(col => col.key)))

  // Filter data based on search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a[sortColumn as keyof MedicalAct]
    const bValue = b[sortColumn as keyof MedicalAct]
    
    if (sortDirection === 'asc') {
      return aValue.toString().localeCompare(bValue.toString())
    } else {
      return bValue.toString().localeCompare(aValue.toString())
    }
  })

  // Pagination
  const totalItems = sortedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = sortedData.slice(startIndex, endIndex)

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const toggleColumn = (columnKey: string) => {
    const newVisibleColumns = new Set(visibleColumns)
    if (newVisibleColumns.has(columnKey)) {
      newVisibleColumns.delete(columnKey)
    } else {
      newVisibleColumns.add(columnKey)
    }
    setVisibleColumns(newVisibleColumns)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      {/* Header Controls */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Afficher</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">éléments</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filtrer :</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                visibleColumns.has(column.key) && (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <button
                          onClick={() => handleSort(column.key)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          {sortColumn === column.key ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )
                          ) : (
                            <div className="w-4 h-4 border border-gray-300 rounded" />
                          )}
                        </button>
                      )}
                    </div>
                  </th>
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  {visibleColumns.has('structure') && (
                    <td className="px-6 py-4 text-sm text-gray-900">{item.structure}</td>
                  )}
                  {visibleColumns.has('codePatient') && (
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.codePatient}</td>
                  )}
                  {visibleColumns.has('nom') && (
                    <td className="px-6 py-4 text-sm text-gray-900">{item.nom}</td>
                  )}
                  {visibleColumns.has('prenoms') && (
                    <td className="px-6 py-4 text-sm text-gray-900">{item.prenoms}</td>
                  )}
                  {visibleColumns.has('nomMere') && (
                    <td className="px-6 py-4 text-sm text-gray-900">{item.nomMere}</td>
                  )}
                  {visibleColumns.has('telephone') && (
                    <td className="px-6 py-4 text-sm text-gray-900">{item.telephone}</td>
                  )}
                  {visibleColumns.has('dateNaissance') && (
                    <td className="px-6 py-4 text-sm text-gray-900">{item.dateNaissance}</td>
                  )}
                  {visibleColumns.has('derniereConsultation') && (
                    <td className="px-6 py-4 text-sm text-gray-900">{item.derniereConsultation}</td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={visibleColumns.size} className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                  Aucune donnée disponible dans le tableau
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} résultats
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Précédent
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
} 