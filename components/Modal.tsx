import React from 'react'


interface ModalProps {
    children: React.ReactNode
    onClose: () => void
    showCloseButton?: boolean
}

export default function Modal({children, onClose, showCloseButton = true}: ModalProps) {
  return (
    <div  style={{zIndex: 99999}} className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div  className="relative  max-w-6xl mx-auto h-screen w-screen">
          {showCloseButton && (
            <button
              className="absolute top-0 right-0 z-10 bg-white/80 hover:bg-white text-green-500 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow"
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