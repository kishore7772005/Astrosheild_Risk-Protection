import React from 'react'
import { Bell, User } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 bg-secondaryBg border-b border-borderAccent flex items-center justify-between px-6">
      <div className="text-sm font-mono text-secondaryText">MARITIME · AUTONOMOUS FLEET OPS</div>
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 text-xs font-bold bg-amberWarning/10 text-amberWarning border border-amberWarning/30 rounded">
          DEMO ENVIRONMENT
        </div>
        <button className="text-secondaryText hover:text-mainText"><Bell size={20} /></button>
        <button className="text-secondaryText hover:text-mainText"><User size={20} /></button>
      </div>
    </header>
  )
}