'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Minus, BarChart3 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import billsData from '@/data/bills.json'

export default function WhatChanged() {
  const bills = billsData.bills
  const current = bills[bills.length - 1]
  const previous = bills[bills.length - 2]
  const oldest = bills[0]
  const peak = bills[1] // May 2025 was the peak at $112.38

  // Full journey changes (Dec 2024 → Feb 2026)
  const journeyChanges = [
    {
      category: 'Plan Base Rate',
      dec: 18.95, current: 22.95,
      explanation: 'Annual rate adjustment effective May 2025',
    },
    {
      category: 'Core Services',
      dec: 59.00, current: 63.00,
      explanation: 'Internet upgraded from 1200 to 1300 Mbps',
    },
    {
      category: 'Equipment Rental',
      dec: 36.00, current: 45.60,
      explanation: 'TV box rates increased from $8 → $9.60 → $11.20/ea',
    },
    {
      category: 'Streaming (Netflix)',
      dec: 12.40, current: 0.00,
      explanation: 'Netflix subscription removed, net savings',
    },
    {
      category: 'Taxes & Fees',
      dec: 9.55, current: 10.03,
      explanation: 'Minor regulatory fee adjustments',
    },
    {
      category: 'Service Discount',
      dec: -40.05, current: -40.05,
      explanation: 'Locked-in discount — unchanged',
    },
  ]

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mb-12"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">What Changed & Why</h2>
          <p className="text-sm text-slate-500">14-month journey: December 2024 → February 2026</p>
        </div>
      </motion.div>

      {/* Plain English Summary */}
      <motion.div
        variants={fadeUp}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6"
      >
        <p className="text-slate-300 leading-relaxed">
          <span className="text-white font-medium">Here's the story:</span> Your bill peaked at{' '}
          <span className="text-amber-400 font-semibold">{formatCurrency(peak.total)}</span> in May 2025 due to plan rate adjustments
          and equipment cost increases. It then dropped to{' '}
          <span className="text-green-400 font-semibold">{formatCurrency(current.total)}</span> when Netflix was removed from your bill.
          Your core service discount of $40.05/month has remained locked in throughout — protecting you from paying{' '}
          <span className="text-white font-medium">{formatCurrency(current.total + current.totalSavings)}</span> at list price.
        </p>
      </motion.div>

      {/* Change Table */}
      <motion.div
        variants={fadeUp}
        className="rounded-xl border border-white/[0.06] overflow-hidden"
      >
        {/* Header */}
        <div className="grid grid-cols-[1fr,80px,80px,80px] md:grid-cols-[1fr,100px,100px,100px,1fr] gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06] text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          <span>Category</span>
          <span className="text-right">Dec 2024</span>
          <span className="text-right">Feb 2026</span>
          <span className="text-right">Change</span>
          <span className="hidden md:block">Why</span>
        </div>

        {/* Rows */}
        {journeyChanges.map((row, idx) => {
          const diff = row.current - row.dec
          const isIncrease = diff > 0.005
          const isDecrease = diff < -0.005
          const isStable = !isIncrease && !isDecrease

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`grid grid-cols-[1fr,80px,80px,80px] md:grid-cols-[1fr,100px,100px,100px,1fr] gap-2 px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${
                row.category === 'Service Discount' ? 'bg-green-500/[0.03]' : ''
              }`}
            >
              <span className="text-sm text-white font-medium">{row.category}</span>
              <span className="text-sm text-slate-400 text-right tabular-nums">{formatCurrency(row.dec)}</span>
              <span className="text-sm text-white text-right tabular-nums font-medium">{formatCurrency(row.current)}</span>
              <span className={`text-sm text-right tabular-nums font-semibold flex items-center justify-end gap-1 ${
                isIncrease ? 'text-amber-400' : isDecrease ? 'text-green-400' : 'text-slate-500'
              }`}>
                {isIncrease && <ArrowUpRight className="w-3.5 h-3.5" />}
                {isDecrease && <ArrowDownRight className="w-3.5 h-3.5" />}
                {isStable && <Minus className="w-3.5 h-3.5" />}
                {isStable ? '—' : `${diff > 0 ? '+' : ''}${formatCurrency(diff)}`}
              </span>
              <span className="hidden md:block text-xs text-slate-500 leading-relaxed">{row.explanation}</span>
            </motion.div>
          )
        })}

        {/* Total Row */}
        <div className="grid grid-cols-[1fr,80px,80px,80px] md:grid-cols-[1fr,100px,100px,100px,1fr] gap-2 px-5 py-4 bg-white/[0.04]">
          <span className="text-sm text-white font-bold">Total</span>
          <span className="text-sm text-slate-300 text-right tabular-nums font-bold">{formatCurrency(oldest.total)}</span>
          <span className="text-sm text-white text-right tabular-nums font-bold">{formatCurrency(current.total)}</span>
          <span className={`text-sm text-right tabular-nums font-bold ${
            current.total - oldest.total < 0 ? 'text-green-400' : 'text-amber-400'
          }`}>
            {current.total - oldest.total >= 0 ? '+' : ''}{formatCurrency(current.total - oldest.total)}
          </span>
          <span className="hidden md:block text-xs text-slate-400 font-medium">Net change over 14 months</span>
        </div>
      </motion.div>
    </motion.section>
  )
}