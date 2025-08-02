"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Liste des utilisateurs autorisés
const authorizedUsers = [
  { username: 'doctor', password: 'Nvs202112345' },
  { username: 'doctor2', password: 'Nvs202112345' },
  { username: 'accueil5', password: 'nvs202123456' },
  { username: 'caisse6', password: 'nvs202123456' },
  { username: 'facturation7', password: 'nvs202123456' },
  { username: 'infirmier2', password: 'nvs202123456' },
  { username: 'labtech', password: 'NvsT202112345' },
  { username: 'admin', password: '1234' }
]

export default function Login2Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simuler un délai de vérification
    setTimeout(() => {
      // console.log('Tentative de connexion:', { username, password })
      // console.log('Utilisateurs autorisés:', authorizedUsers)
      
      const user = authorizedUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      )

      console.log('Utilisateur trouvé:', user)

      if (user) {
        // Stocker l'information de connexion
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('currentUser', user.username)
        
        // Redirection vers Home
        router.push('/Home')
      } else {
        setError("Nom d&apos;utilisateur ou mot de passe incorrect")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="bg-[url('/medic.jpg')] h-screen w-screen bg-cover bg-center relative">
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/20" />
      
      <div className='relative z-10 flex items-center h-screen'>
        {/* Logo en haut à gauche */}
        <motion.div 
          className="absolute top-8 left-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/medic.png"
            alt="Novus Medic"
            width={200}
            height={200}
            className="object-contain"
          />
        </motion.div>

        {/* Formulaire flottant */}
        <motion.div 
          className="ml-20 w-1/3"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 70 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/95 opacity-70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Header du formulaire */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Lock className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Connexion
              </h1>
              
              <p className="text-gray-600 text-sm">
                Accédez à votre espace médical
              </p>
            </motion.div>

            {/* Message d'erreur */}
            {error && (
              <motion.div
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </motion.div>
            )}

            {/* Formulaire */}
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Champ Username */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Nom d&apos;utilisateur
                </label>
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <User className="w-4 h-4" />
                  </motion.div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 h-12 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              {/* Champ Password */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Lock className="w-4 h-4" />
                  </motion.div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 h-12 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Entrez votre mot de passe"
                    required
                    disabled={isLoading}
                  />
                  <motion.button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </motion.button>
        </div>
              </motion.div>

              {/* Bouton de connexion */}
              <motion.div className="pt-4">
                <motion.button
                  type="submit"
                  className="w-full h-12 bg-blue-950 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Vérification en cours...
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      
                    >
                      Se connecter
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        →
                      </motion.div>
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>

            {/* Footer */}
            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-xs text-gray-500">
                Système d&apos;information médical Novus
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}