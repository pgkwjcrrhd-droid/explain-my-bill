'use client'

import { motion } from 'framer-motion'
import { Sparkles, TrendingDown, ArrowRight } from 'lucide-react'
import billsData from '@/data/bills.json'
import { formatCurrency } from '@/lib/utils'

export default function InsightBanner() {
  const bills = billsData.bills
  const current = bills[bills.length - 1]
  const oldest = bills[0]
  const peak = bills.reduce((max, b) => b.total > max.total ? b : max, bills[0])

  const drivers = [
    {
      label: 'Equipment rates adjusted',
      detail: `TV boxes went from $8 to $11.20/ea over 14 months`,
      impact: '+$9.60/mo',
      type: 'increase' as const,
    },
    {
      label: 'Netflix removed from bill',
      detail: 'Third-party streaming charge eliminated',
      impact: '-$14.40/mo',
      type: 'decrease' as const,
    },
    {
      label: 'Service discount maintained',
      detail: '$40.05/mo locked in across all billing periods',
      impact: '-$40.05/mo',
      type: 'decrease' as const,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-8"
    >
      {/* Main Insight Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-950/30 backdrop-blur-sm">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.05] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative p-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-400 tracking-wide uppercase mb-1">Bill Intelligence</h3>
              <p className="text-white text-lg font-medium leading-snug">
                Your bill dropped <span className="text-green-400 font-semibold">{formatCurrency(peak.total - current.total)}</span> from its peak of {formatCurrency(peak.total)} in {peak.month}, settling at <span className="font-semibold">{formatCurrency(current.total)}</span> — stable for two consecutive months.
              </p>
            </div>
          </div>

          {/* Top 3 Drivers */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Top 3 Drivers of Change</p>
            <div className="grid md:grid-cols-3 gap-3">
              {drivers.map((driver, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${driver.type === 'decrease' ? 'text-green-400' : 'text-amber-400'}`}>
                      {driver.impact}
                    </span>
                    {driver.type === 'decrease' && <TrendingDown className="w-3.5 h-3.5 text-green-400" />}
                  </div>
                  <p className="text-sm font-medium text-white mb-1">{driver.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{driver.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What a customer would ask */}
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">If You Were the Customer, You'd Ask...</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Why did my bill go up then back down?',
                'Did a promotion end?',
                'Is my discount still active?',
                'How can I lower it further?'
              ].map((q, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-blue-500/[0.08] border border-blue-500/[0.15] text-blue-300 hover:bg-blue-500/[0.12] transition-colors cursor-default">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}