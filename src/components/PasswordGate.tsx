'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

export default function PasswordGate() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate a brief delay for UX
    setTimeout(() => {
      if (password === 'CBPSO') {
        sessionStorage.setItem('cbpso_auth', 'true')
        router.push('/dashboard')
      } else {
        setError('Invalid password. Please try again.')
        setPassword('')
        setIsLoading(false)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen-safe bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4 sm:px-6 pb-safe">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-5 sm:top-20 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-5 sm:bottom-20 sm:right-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-600/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
          {/* Logo Section */}
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Explain My Bill</h1>
            <p className="text-slate-400 text-sm">Comcast Business Customer Portal</p>
          </motion.div>

          {/* Form Section */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Access Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLoading}
                autoComplete="current-password"
                className="w-full px-4 py-3.5 sm:py-3 bg-slate-800/50 border border-slate-700 rounded-xl sm:rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all disabled:opacity-50"
                style={{ fontSize: '16px' }}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 active:from-blue-700 active:to-blue-800 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl sm:rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/20 text-base sm:text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Unlocking...
                </div>
              ) : (
                'Unlock Portal'
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              This is a secure portal for authorized Comcast Business representatives and customers.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
