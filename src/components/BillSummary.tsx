'use client'

import { motion } from 'framer-motion'
import { formatCurrency, formatDate } from '@/lib/utils'
import billsData from '@/data/bills.json'
import { CheckCircle2, CreditCard, Calendar, TrendingDown, User, MapPin } from 'lucide-react'

export default function BillSummary() {
  const current = billsData.bills[billsData.bills.length - 1]
  const previous = billsData.bills[billsData.bills.length - 2]
  const change = current.total - previous.total

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5,  } },
  }

  return (
    <motion.section variants={stagger} initial="hidden" animate="visible">
      {/* Main Bill Card */}
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm mb-6"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="p-8 md:p-10">
          <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">
            {/* Left: Amount */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Amount Due</p>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl md:text-7xl font-bold text-white tracking-tight tabular-nums">
                  {formatCurrency(current.total)}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-medium text-green-400">AutoPay Active</span>
                </span>
                {change === 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <span className="text-xs font-medium text-blue-400">Stable from last month</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right: Key Details */}
            <div className="grid grid-cols-2 gap-3 min-w-[280px]">
              <MetricCard
                icon={<Calendar className="w-4 h-4 text-slate-400" />}
                label="Due Date"
                value={formatDate(current.dueDate)}
              />
              <MetricCard
                icon={<CreditCard className="w-4 h-4 text-slate-400" />}
                label="Prior Bill"
                value={formatCurrency(current.previousBalance)}
              />
              <MetricCard
                icon={<Calendar className="w-4 h-4 text-slate-400" />}
                label="Bill Period"
                value={`${new Date(current.servicePeriod.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(current.servicePeriod.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              />
              <MetricCard
                icon={<TrendingDown className="w-4 h-4 text-green-400" />}
                label="Monthly Savings"
                value={formatCurrency(current.totalSavings)}
                highlight
              />
            </div>
          </div>

          {/* Account Strip */}
          <div className="mt-8 pt-6 border-t border-white/[0.04] grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Account Holder</p>
                <p className="text-sm font-medium text-slate-300">{billsData.customer}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Service Address</p>
                <p className="text-sm font-medium text-slate-300">503 Woodview Dr, Exton, PA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Account</p>
                <p className="text-sm font-medium text-slate-300 font-mono">{billsData.account}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings Highlight Strip */}
      <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-xs text-slate-500 font-medium mb-1">Annual Cost</p>
          <p className="text-2xl font-bold text-white tabular-nums">{formatCurrency(current.total * 12)}</p>
          <p className="text-xs text-slate-500 mt-1">Based on current rate</p>
        </div>
        <div className="rounded-xl border border-green-500/[0.15] bg-green-500/[0.04] p-5">
          <p className="text-xs text-green-400/70 font-medium mb-1">Annual Savings</p>
          <p className="text-2xl font-bold text-green-400 tabular-nums">{formatCurrency(current.totalSavings * 12)}</p>
          <p className="text-xs text-green-400/50 mt-1">From active discounts</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-xs text-slate-500 font-medium mb-1">Without Discounts</p>
          <p className="text-2xl font-bold text-slate-400 tabular-nums">{formatCurrency((current.total + current.totalSavings) * 12)}</p>
          <p className="text-xs text-slate-500 mt-1">What you'd pay at list price</p>
        </div>
      </motion.div>
    </motion.section>
  )
}

function MetricCard({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-3.5 border ${highlight ? 'border-green-500/[0.15] bg-green-500/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'}`}>
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</p>
    </div>
  )
}