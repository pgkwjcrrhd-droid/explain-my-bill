'use client'

import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'
import billsData from '@/data/bills.json'
import { Clock } from 'lucide-react'

export default function BillTimeline() {
  const bills = billsData.bills
  const maxBill = Math.max(...bills.map(b => b.total))
  const minBill = Math.min(...bills.map(b => b.total))
  const range = maxBill - minBill || 1

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-8 sm:mb-12"
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">Bill History</h2>
          <p className="text-xs sm:text-sm text-slate-500">4 statements across 14 months</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6 md:p-8">
        {/* Visual Bar Chart */}
        <div className="flex items-end gap-2 sm:gap-3 md:gap-6 mb-6 sm:mb-8 h-36 sm:h-48">
          {bills.map((bill, idx) => {
            const height = 30 + ((bill.total - minBill) / range) * 70
            const isCurrent = idx === bills.length - 1
            const isPeak = bill.total === maxBill

            return (
              <motion.div
                key={bill.id}
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: `${height}%`, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex-1 flex flex-col items-center justify-end relative group"
              >
                {/* Amount label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.15 }}
                  className="mb-1.5 sm:mb-2 text-center"
                >
                  <span className={`text-xs sm:text-sm md:text-base font-bold tabular-nums ${isCurrent ? 'text-blue-400' : isPeak ? 'text-amber-400' : 'text-white'}`}>
                    {formatCurrency(bill.total)}
                  </span>
                </motion.div>

                {/* Bar */}
                <div
                  className={`w-full rounded-t-lg transition-colors relative overflow-hidden ${
                    isCurrent
                      ? 'bg-gradient-to-t from-blue-600 to-blue-500'
                      : isPeak
                      ? 'bg-gradient-to-t from-amber-600/80 to-amber-500/60'
                      : 'bg-gradient-to-t from-slate-700 to-slate-600'
                  }`}
                  style={{ height: '100%' }}
                >
                  <div className="absolute inset-0 bg-white/[0.05]" />
                </div>

                {/* Tags */}
                <div className="mt-2 sm:mt-3 text-center space-y-0.5 sm:space-y-1">
                  <p className="text-[10px] sm:text-xs font-medium text-slate-300">{bill.month.split(' ')[0]}</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500">{bill.month.split(' ')[1]}</p>
                  {isCurrent && (
                    <span className="inline-block text-[8px] sm:text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1 sm:px-1.5 py-0.5 rounded">
                      CURRENT
                    </span>
                  )}
                  {isPeak && !isCurrent && (
                    <span className="inline-block text-[8px] sm:text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1 sm:px-1.5 py-0.5 rounded">
                      PEAK
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary — 2x2 on mobile, 4-col on desktop */}
        <div className="border-t border-white/[0.06] pt-3 sm:pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Lowest</p>
            <p className="text-base sm:text-lg font-bold text-white tabular-nums">{formatCurrency(minBill)}</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Highest</p>
            <p className="text-base sm:text-lg font-bold text-amber-400 tabular-nums">{formatCurrency(maxBill)}</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Average</p>
            <p className="text-base sm:text-lg font-bold text-white tabular-nums">{formatCurrency(bills.reduce((s, b) => s + b.total, 0) / bills.length)}</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Variance</p>
            <p className="text-base sm:text-lg font-bold text-slate-400 tabular-nums">{formatCurrency(maxBill - minBill)}</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
