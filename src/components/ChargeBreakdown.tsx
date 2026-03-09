'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Wifi, Tv, Phone, Shield, HardDrive, Film, Tag, Receipt, Layers } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import billsData from '@/data/bills.json'

export default function ChargeBreakdown() {
  const currentBill = billsData.bills[billsData.bills.length - 1]
  const [expanded, setExpanded] = useState<string | null>(null)

  const sections = [
    {
      id: 'plan',
      name: 'My Xfinity Plan',
      icon: <Layers className="w-4 h-4" />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      amount: currentBill.lineItems.plan.amount,
      explanation: 'Base subscription tier that bundles your TV, Internet, Voice, and Home services into a single plan.',
      items: [{ name: 'My Xfinity Plan (bundle base)', amount: 22.95 }],
    },
    {
      id: 'services',
      name: 'Core Services',
      icon: <Wifi className="w-4 h-4" />,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      amount: currentBill.lineItems.services.amount,
      explanation: 'Your primary services: TV, Internet, Voice, and Home Security. These form the core of your Comcast Business subscription.',
      items: (currentBill.lineItems.services as any).details || [],
    },
    {
      id: 'addons',
      name: 'Add-ons & Upgrades',
      icon: <Film className="w-4 h-4" />,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      amount: currentBill.lineItems.addOns.amount + currentBill.lineItems.videoRecording.amount,
      explanation: 'Premium features you\'ve added to enhance your base services, including DVR, additional channels, and speed upgrades.',
      items: [
        ...(currentBill.lineItems.addOns as any).details || [],
        { name: '24/7 Video Recording (7 days, up to 4 cameras)', amount: 4.00 },
      ],
    },
    {
      id: 'equipment',
      name: 'Equipment & Devices',
      icon: <HardDrive className="w-4 h-4" />,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      amount: currentBill.lineItems.equipment.amount,
      explanation: 'Monthly rental fees for your network equipment. You can purchase your own modem to eliminate the $12/mo rental.',
      items: (currentBill.lineItems.equipment as any).details || [],
    },
    {
      id: 'discounts',
      name: 'Discounts & Credits',
      icon: <Tag className="w-4 h-4" />,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      amount: currentBill.lineItems.discounts.amount,
      explanation: 'Your locked-in service discount reduces your bill by $40.05 every month. Combined with add-on promotional discounts, you save $67.45/mo.',
      items: [
        { name: 'Service Discount (locked)', amount: -40.05 },
        { name: 'Xfinity TV Latino discount', amount: -10.00 },
        { name: 'Premium DVR discount', amount: -4.00 },
        { name: 'Gigabit Extra discount', amount: -2.00 },
        { name: 'TV Box discount', amount: -8.40 },
        { name: 'Modem discount', amount: -3.00 },
      ],
      highlight: true,
    },
    {
      id: 'taxes',
      name: 'Taxes, Fees & Regulatory',
      icon: <Receipt className="w-4 h-4" />,
      color: 'text-slate-400',
      bg: 'bg-slate-500/10',
      amount: currentBill.lineItems.taxesAndFees.amount,
      explanation: 'Government-mandated taxes and regulatory fees. These are required by federal, state, and local authorities and apply to all telecom services in Pennsylvania.',
      items: (currentBill.lineItems.taxesAndFees as any).details || [],
    },
  ]

  const totalCharges = sections.reduce((sum, s) => sum + s.amount, 0)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <Receipt className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Your Charges, Explained</h2>
          <p className="text-sm text-slate-500">Click any section to see line-item details</p>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = expanded === section.id

          return (
            <motion.div
              key={section.id}
              layout
              className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
                section.highlight
                  ? 'border-green-500/20 bg-green-500/[0.03]'
                  : isOpen
                  ? 'border-white/[0.08] bg-white/[0.03]'
                  : 'border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.07]'
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : section.id)}
                className="w-full px-5 py-4 flex items-center gap-4 text-left"
              >
                <div className={`w-8 h-8 rounded-lg ${section.bg} flex items-center justify-center flex-shrink-0 ${section.color}`}>
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{section.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{section.items.length} item{section.items.length !== 1 ? 's' : ''}</p>
                </div>
                <span className={`text-base font-bold tabular-nums mr-2 ${section.amount < 0 ? 'text-green-400' : 'text-white'}`}>
                  {formatCurrency(section.amount)}
                </span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/[0.04]">
                      {/* Explanation */}
                      <p className="text-sm text-slate-400 leading-relaxed py-4 border-b border-white/[0.03]">
                        {section.explanation}
                      </p>

                      {/* Line items */}
                      <div className="pt-3 space-y-2">
                        {section.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between py-1.5">
                            <span className="text-sm text-slate-300">{item.name}</span>
                            <span className={`text-sm font-medium tabular-nums ${
                              item.amount < 0 ? 'text-green-400' : item.amount === 0 || item.amount === null ? 'text-slate-500' : 'text-white'
                            }`}>
                              {item.amount === null ? 'Included' : formatCurrency(item.amount)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Data confidence label */}
                      <div className="mt-4 pt-3 border-t border-white/[0.03]">
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 bg-white/[0.03] px-2 py-1 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          Extracted from uploaded bill — high confidence
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-4 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/[0.06] to-indigo-500/[0.04] p-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Amount Due</p>
            <p className="text-3xl font-bold text-white tabular-nums">{formatCurrency(currentBill.total)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-400/60 font-medium uppercase tracking-wider mb-1">You Save</p>
            <p className="text-2xl font-bold text-green-400 tabular-nums">{formatCurrency(currentBill.totalSavings)}<span className="text-sm text-green-400/60">/mo</span></p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}