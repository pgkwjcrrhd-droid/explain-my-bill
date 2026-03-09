'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PasswordGate from '@/components/PasswordGate'

export default function Home() {
  return <PasswordGate />
}