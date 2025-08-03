"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Calendar, Filter, Eye, Download, Edit } from 'lucide-react'
import InvoiceDetailModal from './InvoiceDetailModal'

interface BillingInvoice {
  id: string
  codePatient: string
  dateFacturation: string
  nom: string
  prenom: string
  montant: number
  etatFacture: 'payée' | 'partiellement_payée' | 'non_payée'
}

interface BillingTableProps {
  onViewDetails?: (invoiceId: string) => void
}

const mockData: BillingInvoice[] = [
  {
    id: '1',
    codePatient: '070240',
    dateFacturation: '16/07/2025',
    nom: 'PATIENT 2',
    prenom: 'NICOLAS',
    montant: 4500,
    etatFacture: 'partiellement_payée'
  },
  {
    id: '2',
    codePatient: '070241',
    dateFacturation: '15/07/2025',
    nom: 'DUPONT',
    prenom: 'MARIE',
    montant: 25000,
    etatFacture: 'payée'
  },
  {
    id: '3',
    codePatient: '070242',
    dateFacturation: '14/07/2025',
    nom: 'KONÉ',
    prenom: 'FATOU',
    montant: 15000,
    etatFacture: 'non_payée'
  }
]

const columns = [
  { key: 'codePatient', label: 'Code Patient', sortable: true },
  { key: 'dateFacturation', label: 'Date facturation', sortable: true },
  { key: 'nom', label: 'Nom', sortable: true },
  { key: 'prenom', label: 'Prénom', sortable: true },
  { key: 'montant', label: 'Montant (F CFA)', sortable: true },
  { key: 'etatFacture', label: 'Etat facture', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
]

export default function BillingTable({ onViewDetails }: BillingTableProps) {
  const [data] = useState<BillingInvoice[]>(mockData)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [startDate, setStartDate] = useState('01/06/2025')
  const [endDate, setEndDate] = useState('02/08/2025')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice] = useState<BillingInvoice | null>(null)

  const handleViewDetails = (invoiceId: string) => {
    if (onViewDetails) {
      onViewDetails(invoiceId)
    }
  }

  // Filter data based on search term and date range
  const filteredData = data.filter(item => {
    const matchesSearch = Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    const matchesDateRange = (!startDate || item.dateFacturation >= startDate) &&
                           (!endDate || item.dateFacturation <= endDate)
    
    return matchesSearch && matchesDateRange
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField || sortField === 'actions') return 0
    
    const aValue = a[sortField as keyof BillingInvoice]
    const bValue = b[sortField as keyof BillingInvoice]
    
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
    if (sortField === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(columnKey)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payée':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'partiellement_payée':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'non_payée':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'payée':
        return 'Payée'
      case 'partiellement_payée':
        return 'Partiellement payée'
      case 'non_payée':
        return 'Non payée'
      default:
        return status
    }
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
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Date Range Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue"
                placeholder="Date de début"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Date de fin"
              />
            </div>
            <motion.button
              className="px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue-950 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-4 h-4" />
              Chercher
            </motion.button>
          </div>

          {/* Search and Display Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Afficher</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">éléments</span>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Filtrer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue w-48"
              />
            </div>
          </div>
        </div>

        {/* Date Range Display */}
        {(startDate || endDate) && (
          <motion.div
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-700 font-medium">
              LES FACTURES DU: {startDate || '...'} au {endDate || '...'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
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
                        <div className="w-4 h-4 border border-gray-300 rounded" />
                      </button>
                    )}
                  </div>
                </th>
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
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {item.codePatient}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.dateFacturation}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.nom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.prenom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {item.montant.toLocaleString()} F CFA
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.etatFacture)}`}>
                      {getStatusText(item.etatFacture)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        className="p-2 text-blue hover:bg-blue-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Voir détails"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Télécharger"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                  Aucune donnée disponible dans le tableau
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} résultats
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Précédent
            </motion.button>
            
            <motion.button
              className="px-4 py-2 text-sm bg-blue text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentPage}
            </motion.button>
            
            <motion.button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Suivant
            </motion.button>
          </div>
        </div>
      )}
    <InvoiceDetailModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      invoiceId={selectedInvoice?.id}
    />
    </motion.div>
  )
} 