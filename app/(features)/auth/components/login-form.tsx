"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuler un délai de connexion
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    loading: { scale: 0.95 }
  };

  return (
    // <motion.form
    //   className={cn("flex flex-col gap-8", className)}
    //   variants={containerVariants}
    //   initial="hidden"
    //   animate="visible"
    //   onSubmit={handleSubmit}
    //   {...props}
    // >
    //   {/* Header avec animation */}
    //   <motion.div 
    //     className="flex flex-col items-center text-center space-y-3"
        
    //   >
    //     <motion.div
    //       initial={{ scale: 0.8, opacity: 0 }}
    //       animate={{ scale: 1, opacity: 1 }}
    //       transition={{ delay: 0.2, duration: 0.5 }}
    //       className="mb-6"
    //     >
    //       <div className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mb-4">
    //         <Lock className="w-8 h-8 text-white" />
    //       </div>
    //     </motion.div>
        
    //     <motion.h1 
    //       className="text-2xl font-bold text-gray-900"
          
    //     >
    //       Connexion
    //     </motion.h1>
        
    //     <motion.p 
    //       className="text-gray-600 text-sm"
          
    //     >
    //       Accédez à votre espace médical
    //     </motion.p>
    //   </motion.div>

    //   {/* Formulaire */}
    //   <motion.div 
    //     className="space-y-6"
        
    //   >
    //     {/* Email Field */}
    //     <motion.div 
    //       className="space-y-2"
    //       whileHover={{ scale: 1.02 }}
    //       transition={{ type: "spring", stiffness: 300 }}
    //     >
    //       <Label htmlFor="email" className="text-sm font-medium text-gray-700">
    //         Nom d'utilisateur
    //       </Label>
    //       <div className="relative">
    //         <motion.div
    //           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    //           initial={{ opacity: 0 }}
    //           animate={{ opacity: 1 }}
    //           transition={{ delay: 0.3 }}
    //         >
    //           <User className="w-4 h-4" />
    //         </motion.div>
    //         <Input
    //           id="email"
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
    //           placeholder="Entrez votre nom d'utilisateur"
    //           required
    //         />
    //       </div>
    //     </motion.div>

    //     {/* Password Field */}
    //     <motion.div 
    //       className="space-y-2"
    //       whileHover={{ scale: 1.02 }}
    //       transition={{ type: "spring", stiffness: 300 }}
    //     >
    //       <Label htmlFor="password" className="text-sm font-medium text-gray-700">
    //         Mot de passe
    //       </Label>
    //       <div className="relative">
    //         <motion.div
    //           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    //           initial={{ opacity: 0 }}
    //           animate={{ opacity: 1 }}
    //           transition={{ delay: 0.4 }}
    //         >
    //           <Lock className="w-4 h-4" />
    //         </motion.div>
    //         <Input
    //           id="password"
    //           type={showPassword ? "text" : "password"}
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-900 focus:ring-blue-900 transition-all duration-200"
    //           placeholder="Entrez votre mot de passe"
    //           required
    //         />
    //         <motion.button
    //           type="button"
    //           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
    //           onClick={() => setShowPassword(!showPassword)}
    //           whileHover={{ scale: 1.1 }}
    //           whileTap={{ scale: 0.9 }}
    //         >
    //           <AnimatePresence mode="wait">
    //             {showPassword ? (
    //               <motion.div
    //                 key="eye-off"
    //                 initial={{ opacity: 0, rotate: -90 }}
    //                 animate={{ opacity: 1, rotate: 0 }}
    //                 exit={{ opacity: 0, rotate: 90 }}
    //                 transition={{ duration: 0.2 }}
    //               >
    //                 <EyeOff className="w-4 h-4" />
    //               </motion.div>
    //             ) : (
    //               <motion.div
    //                 key="eye"
    //                 initial={{ opacity: 0, rotate: -90 }}
    //                 animate={{ opacity: 1, rotate: 0 }}
    //                 exit={{ opacity: 0, rotate: 90 }}
    //                 transition={{ duration: 0.2 }}
    //               >
    //                 <Eye className="w-4 h-4" />
    //               </motion.div>
    //             )}
    //           </AnimatePresence>
    //         </motion.button>
    //       </div>
    //     </motion.div>

    //     {/* Submit Button */}
    //     <motion.div
          
    //       className="pt-4"
    //     >
    //       <motion.button
    //         type="submit"
    //         className="w-full h-12 bg-blue-950 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
    //         variants={buttonVariants}
    //         initial="idle"
    //         whileHover="hover"
    //         whileTap="tap"
    //         animate={isLoading ? "loading" : "idle"}
    //         disabled={isLoading}
    //       >
    //         <AnimatePresence mode="wait">
    //           {isLoading ? (
    //             <motion.div
    //               key="loading"
    //               initial={{ opacity: 0 }}
    //               animate={{ opacity: 1 }}
    //               exit={{ opacity: 0 }}
    //               className="flex items-center gap-2"
    //             >
    //               <motion.div
    //                 className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
    //                 animate={{ rotate: 360 }}
    //                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    //               />
    //               Connexion en cours...
    //             </motion.div>
    //           ) : (
    //             <motion.div
    //               key="idle"
    //               initial={{ opacity: 0 }}
    //               animate={{ opacity: 1 }}
    //               exit={{ opacity: 0 }}
    //               className="flex items-center gap-2"
    //             >
    //               Se connecter
    //               <motion.div
    //                 initial={{ x: 0 }}
    //                 whileHover={{ x: 3 }}
    //                 transition={{ type: "spring", stiffness: 300 }}
    //               >
    //                 <ArrowRight className="w-4 h-4" />
    //               </motion.div>
    //             </motion.div>
    //           )}
    //         </AnimatePresence>
    //       </motion.button>
    //     </motion.div>
    //   </motion.div>

    //   {/* Footer */}
    //   <motion.div 
    //     className="text-center"
        
    //   >
    //     <motion.p 
    //       className="text-xs text-gray-500"
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ delay: 0.6 }}
    //     >
    //       Système d'information médical Novus
    //     </motion.p>
    //   </motion.div>
    // </motion.form>
    <div>
        <h1>Login</h1>
    </div>
  );
}
