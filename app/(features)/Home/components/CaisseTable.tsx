"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Calendar, Filter, Eye, Download, Edit, DollarSign, CreditCard, CheckCircle, Smartphone } from 'lucide-react'

interface CaisseInvoice {
  id: string
  patientCode: string
  invoiceDate: string
  lastName: string
  firstName: string
  amount: number
  status: 'payee' | 'partiellement_payee' | 'non_payee'
  patientId: string
}

interface CaisseTableProps {
  onViewDetails?: (invoiceId: string) => void
}

const mockData: CaisseInvoice[] = [
  {
    id: '163',
    patientCode: '070240',
    invoiceDate: '16/07/2025',
    lastName: 'PATIENT 2',
    firstName: 'NICOLAS',
    amount: 4500,
    status: 'partiellement_payee',
    patientId: '070240'
  },
  {
    id: '164',
    patientCode: '070241',
    invoiceDate: '15/07/2025',
    lastName: 'PATIENT 3',
    firstName: 'MARIE',
    amount: 3000,
    status: 'payee',
    patientId: '070241'
  },
  {
    id: '165',
    patientCode: '070242',
    invoiceDate: '14/07/2025',
    lastName: 'PATIENT 4',
    firstName: 'JEAN',
    amount: 6000,
    status: 'non_payee',
    patientId: '070242'
  }
]

const columns = [
  { key: 'patientCode', label: 'Code Patient', sortable: true },
  { key: 'invoiceDate', label: 'Date facturation', sortable: true },
  { key: 'lastName', label: 'Nom', sortable: true },
  { key: 'firstName', label: 'Prénom', sortable: true },
  { key: 'amount', label: 'Montant (F CFA)', sortable: true },
  { key: 'status', label: 'Etat facture', sortable: true },
  { key: 'actions', label: '', sortable: false }
]

export default function CaisseTable({ onViewDetails }: CaisseTableProps) {
  const [data] = useState<CaisseInvoice[]>(mockData)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [startDate, setStartDate] = useState('01/06/2025')
  const [endDate, setEndDate] = useState('02/08/2025')

  // Filter data
  const filteredData = data.filter(item =>
    item.patientCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.invoiceDate.includes(searchTerm)
  )

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField as keyof CaisseInvoice]
    const bValue = b[sortField as keyof CaisseInvoice]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payee': return 'text-green-600 bg-green-100'
      case 'partiellement_payee': return 'text-blue-600 bg-blue-100'
      case 'non_payee': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'payee': return 'Payée'
      case 'partiellement_payee': return 'Partiellement payée'
      case 'non_payee': return 'Non payée'
      default: return status
    }
  }

  const handleViewDetails = (invoiceId: string) => {
    if (onViewDetails) {
      onViewDetails(invoiceId)
    }
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Date Range Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Date de Début:</label>
              <input
                type="date"
                value={new Date(startDate).toLocaleDateString('fr-FR')}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01/06/2025"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Date de Fin:</label>
              <input
                type="date"
                value={new Date(endDate).toLocaleDateString('fr-FR')}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="02/08/2025"
              />
            </div>
            <motion.button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-4 h-4" />
              Chercher
            </motion.button>
          </div>

          {/* Search and Display Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Afficher:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">éléments</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Filtrer :"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Date Range Display */}
        <div className="mt-4">
          <p className="text-red-600 font-semibold">
            LES FACTURES DU: {startDate} au {endDate}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <div className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent ${
                          sortField === column.key && sortDirection === 'asc' ? 'border-b-gray-400' : 'border-b-gray-300'
                        }`} />
                        <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${
                          sortField === column.key && sortDirection === 'desc' ? 'border-t-gray-400' : 'border-t-gray-300'
                        }`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.patientCode}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.invoiceDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      onClick={() => handleViewDetails(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Voir détails"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, sortedData.length)} sur {sortedData.length} résultats
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
              whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
            >
              Précédent
            </motion.button>
            <span className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg">
              {currentPage}
            </span>
            <motion.button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: currentPage < totalPages ? 1.05 : 1 }}
              whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
            >
              Suivant
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 