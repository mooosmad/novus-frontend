// "use client"

// import { GalleryVerticalEnd } from "lucide-react"
// import Image from "next/image"
// import { useState } from "react"
// import { LoginForm } from "@/app/(features)/auth/components/login-form"
// import { motion, AnimatePresence } from "framer-motion"

// export default function LoginPage() {
//   const [logoError, setLogoError] = useState(false)
//   const [backgroundError, setBackgroundError] = useState(false)

//   const pageVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const leftPanelVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.8
//       }
//     }
//   };

//   const rightPanelVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.8,
//         delay: 0.3
//       }
//     }
//   };

//   return (
//     <motion.div 
//       className="grid min-h-svh lg:grid-cols-2"
//       variants={pageVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* LEFT: Texte + Form */}
//       <motion.div 
//         className="flex flex-col gap-6 p-6 md:p-10"
//         variants={leftPanelVariants}
//       >
//         {/* Logo avec animation */}
//         <motion.div 
//           className="flex justify-center gap-2 md:justify-start"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           <a href="#" className="flex items-center gap-2 font-medium">
//             <AnimatePresence mode="wait">
//               {!logoError ? (
//                 <motion.div
//                   key="logo"
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.8, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Image
//                     src="/medic.png"
//                     alt="Novus Medic"
//                     width={200}
//                     height={200}
//                     className="object-contain"
//                     onError={() => {
//                       console.log("Logo failed to load: /medic.png")
//                       setLogoError(true)
//                     }}
//                   />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="fallback"
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.8, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex size-12 items-center justify-center rounded-xl shadow-lg"
//                 >
//                   <GalleryVerticalEnd className="size-6" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </a>
//         </motion.div>

//         {/* Login Form avec animation */}
//         <motion.div 
//           className="flex flex-1 items-center justify-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//         >
//           <div className="w-full max-w-sm">
//             <LoginForm />
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* RIGHT: Image plein écran avec animation */}
//       <motion.div 
//         className="relative hidden lg:block"
//         variants={rightPanelVariants}
//       >
//         <AnimatePresence mode="wait">
//           {!backgroundError ? (
//             <motion.div
//               key="background-image"
//               initial={{ opacity: 0, scale: 1.1 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 1.1 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="absolute inset-0"
//             >
//               <Image
//                 src="/medic.jpg"
//                 alt="Novus Medical System"
//                 fill
//                 className="object-cover"
//                 onError={() => {
//                   console.log("Background image failed to load: /medic.jpg")
//                   setBackgroundError(true)
//                 }}
//               />
//               {/* Overlay subtil pour améliorer la lisibilité */}
//               <div className="absolute inset-0 bg-black/10" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="fallback-background"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50"
//             />
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   )
// }