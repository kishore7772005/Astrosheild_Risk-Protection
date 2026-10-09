import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AstroShieldDashboard from '../pages/AstroShieldDashboard'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AstroShieldDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}