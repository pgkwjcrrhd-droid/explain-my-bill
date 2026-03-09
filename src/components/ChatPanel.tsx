'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageCircle, ArrowRight, Bot, User } from 'lucide-react'
import { qaEngine } from '@/lib/qa-engine'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  followUps?: string[]
  sources?: string[]
}

const suggestedPrompts = [
  "Why did my bill go up?",
  "What am I paying for?",
  "What discounts am I getting?",
  "Did a promotion end?",
  "Are taxes and fees normal?",
  "How can I lower my bill?",
  "What changed from last month?",
  "Is there anything unusual?",
]

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'bot',
      content: "Hi Nicholas — I'm your billing assistant. I've reviewed your February 2026 statement and can help explain any charge, identify what changed, or discuss ways to optimize your plan.\n\nWhat would you like to know?",
      followUps: [
        "Why did my bill increase over the past year?",
        "What discounts am I getting?",
        "Walk me through my charges",
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg) return

    const userMsg: Message = { id: Date.now().toString(), type: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate thoughtful delay
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400))

    const response = qaEngine.findAnswer(msg)
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: response.answer,
      followUps: response.followUps,
      sources: response.sources,
    }
    setMessages(prev => [...prev, botMsg])
    setIsTyping(false)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Ask About Your Bill</h2>
          <p className="text-sm text-slate-500">Grounded in your actual statement data</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-[#0a101f]">
        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-5">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                )}

                <div className={`max-w-[85%] md:max-w-[70%] ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                    : 'bg-white/[0.04] border border-white/[0.06] text-slate-200 rounded-2xl rounded-bl-md'
                } px-4 py-3`}>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap chat-message" dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />

                  {msg.type === 'bot' && msg.followUps && msg.followUps.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1.5">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Follow-up questions</p>
                      {msg.followUps.map((fu, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(fu)}
                          className="flex items-center gap-2 w-full text-left text-xs py-1.5 px-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors group"
                        >
                          <ArrowRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                          <span>{fu}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.type === 'bot' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {msg.sources.map((src, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-white/[0.03] rounded text-slate-500">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {msg.type === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/[0.06] p-4 bg-white/[0.02]">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your bill..."
              disabled={isTyping}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 disabled:opacity-50 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-4 py-2.5 rounded-xl transition-colors disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="mt-4">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Common Questions</p>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => sendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.05] transition-all"
            >
              {prompt}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  )
}