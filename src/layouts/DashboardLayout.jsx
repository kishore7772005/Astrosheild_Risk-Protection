import React from 'react'


export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-transparent flex flex-col w-full">
      <main className="flex-1 w-full overflow-x-hidden overflow-y-auto bg-transparent relative">
        {children}
      </main>
    </div>
  )
}