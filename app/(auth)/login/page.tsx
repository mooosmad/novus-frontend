"use client"

import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { LoginForm } from "@/features/auth/components/login-form"

export default function LoginPage() {
  const [logoError, setLogoError] = useState(false)
  const [backgroundError, setBackgroundError] = useState(false)

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* LEFT: Texte + Form */}
      <div className="flex flex-col gap-6 p-6 md:p-10">
        {/* Logo */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            {!logoError ? (
              <Image
                src="/medic.png"
                alt="Novus Medic"
                width={200}
                height={200}
                className="object-contain"
                onError={() => {
                  console.log("Logo failed to load: /medic.png")
                  setLogoError(true)
                }}
              />
            ) : (
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
            )}
          </a>
        </div>

        {/* Login Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* RIGHT: Image plein écran sans overlay */}
      <div className="relative hidden lg:block">
        {!backgroundError ? (
          <Image
            src="/medic.jpg"
            alt="Novus Medical System"
            fill
            className="object-cover"
            onError={() => {
              console.log("Background image failed to load: /medic.jpg")
              setBackgroundError(true)
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        )}
      </div>
    </div>
  )
}