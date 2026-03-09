'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, ChevronDown } from 'lucide-react'

export default function PrototypeNotes() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mb-6 sm:mb-8"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl border border-white/[0.04] bg-white/[0.01] active:bg-white/[0.03] p-3.5 sm:p-4 flex items-center gap-3 transition-colors"
      >
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
        <span className="text-xs sm:text-sm text-slate-500 font-medium flex-1 text-left">Prototype Notes & Data Provenance</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1.5 sm:mb-2">Grounded in Real Data</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All financial figures, line items, charge categories, tax breakdowns, and account details were extracted directly from 4 uploaded Comcast/Xfinity billing statements (Dec 2024, May 2025, Jan 2026, Feb 2026) for account 8499 10 088 0241988.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5 sm:mb-2">Demo Interpretations</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Explanations of <em>why</em> charges changed (e.g., rate adjustments, market conditions), the Q&A answer phrasing, and churn-mitigating language are demo interpretations designed to illustrate the customer experience. Service descriptions are based on bill text but enhanced for clarity.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5 sm:mb-2">Authentication</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Password gate uses sessionStorage with the code CBPSO. This is prototype-grade only — production would require proper OAuth/SSO integration with Comcast identity systems.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">Future-State Features</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  In production, the Q&A would be powered by a grounded LLM with access to real-time account data, billing history, promotional databases, and retention offer engines. The prototype demonstrates the interaction design and answer quality bar.
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.04]">
                <p className="text-[10px] text-slate-600">
                  Built as an executive concept prototype for Comcast Business Product Leadership. Stack: Next.js, TypeScript, Tailwind CSS, Framer Motion.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
