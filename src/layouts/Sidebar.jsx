import React from 'react'
import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-secondaryBg border-r border-borderAccent h-screen p-4">
      <Link to="/" className="flex items-center gap-3 mb-8">
        <Shield className="text-cyanAccent" size={32} />
        <span className="text-xl font-bold text-mainText tracking-wider">ASTROSHIELD</span>
      </Link>
      <nav className="flex-1 space-y-2">
        <Link to="/" className="block px-4 py-2 rounded bg-panelBg text-cyanAccent font-medium border border-borderAccent">
          Dashboard
        </Link>
      </nav>
      <div className="text-xs text-secondaryText mt-auto font-mono">
        v1.0.0-demo
      </div>
    </div>
  )
}