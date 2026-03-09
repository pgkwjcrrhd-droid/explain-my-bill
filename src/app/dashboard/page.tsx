'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import BillSummary from '@/components/BillSummary'
import BillTimeline from '@/components/BillTimeline'
import ChargeBreakdown from '@/components/ChargeBreakdown'
import WhatChanged from '@/components/WhatChanged'
import InsightBanner from '@/components/InsightBanner'
import ChatPanel from '@/components/ChatPanel'
import PrototypeNotes from '@/components/PrototypeNotes'
import { Shield, LogOut } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const auth = typeof window !== 'undefined' && sessionStorage.getItem('cbpso_auth')
    if (!auth) {
      router.push('/')
    } else {
      setIsAuthed(true)
    }
  }, [router])

  if (!isAuthed) return null

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white tracking-tight">Explain My Bill</h1>
                <p className="text-[11px] text-slate-500 tracking-wide uppercase">Comcast Business • Prototype</p>
              </div>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('cbpso_auth')
                router.push('/')
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-300 border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-all duration-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pt-12 pb-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-blue-400 font-medium mb-3"
          >
            February 2026 Statement
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Your bill, explained.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-400 max-w-2xl leading-relaxed"
          >
            Every charge broken down in plain English. No jargon, no surprises—just clarity about what you're paying for and why.
          </motion.p>
        </motion.div>

        <InsightBanner />

        <div className="py-6">
          <BillSummary />
        </div>

        <WhatChanged />
        <ChargeBreakdown />
        <BillTimeline />
        <ChatPanel />
        <PrototypeNotes />

        {/* Footer */}
        <footer className="border-t border-white/[0.04] py-8 mt-8 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-600">
              Explain My Bill — Executive Prototype • Comcast Business
            </p>
            <p className="text-xs text-slate-600">
              Data sourced from uploaded customer statements
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}