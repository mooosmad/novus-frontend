"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, LogOut } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const authStatus = localStorage.getItem('isAuthenticated')
    const user = localStorage.getItem('currentUser')

    if (authStatus === 'true' && user) {
      setIsAuthenticated(true)
      setCurrentUser(user)
    } else {
      // Rediriger vers la page de login si non authentifié
      router.push('/login2')
    }
    
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
    router.push('/login2')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
                        <p className="text-gray-600">Vérification de l&apos;authentification...</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // La redirection est gérée dans useEffect
  }

  return (
    <div className="relative">
      {/* Header avec info utilisateur et bouton de déconnexion */}
      <div className="absolute top-4 right-4 z-50">
        <motion.div
          className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm">
            <span className="text-gray-600">Connecté en tant que :</span>
            <span className="ml-1 font-medium text-gray-900">{currentUser}</span>
          </div>
          <motion.button
            onClick={handleLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {children}
    </div>
  )
} 