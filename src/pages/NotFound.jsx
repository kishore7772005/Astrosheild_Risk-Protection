import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mainBg text-mainText">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <Link to="/" className="text-cyanAccent hover:underline">Return to Dashboard</Link>
      </div>
    </div>
  )
}