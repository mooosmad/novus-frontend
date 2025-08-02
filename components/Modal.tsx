import React from 'react'

interface ModalProps {
    children: React.ReactNode
    onClose: () => void
    showCloseButton?: boolean
}

export default function Modal({children, onClose, showCloseButton = true}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {showCloseButton && (
          <button
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow-lg transition-colors"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  )
}