import React from 'react'
import AdminNavbar02 from './AdminNavbar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <AdminNavbar02 />
      <main className="min-h-[calc(100vh-3rem)] w-full p-2 md:p-4">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout
