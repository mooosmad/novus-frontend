"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    
    if (isAuthenticated === 'true') {
      // Si authentifié, rediriger vers Home
      router.replace('/Home')
    } else {
      // Sinon, rediriger vers le login
      router.replace('/login2')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirection en cours...</p>
      </div>
    </div>
  )
} 