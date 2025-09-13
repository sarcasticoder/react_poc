import React from 'react'
import { useAuth } from '@/shared/contexts/AuthContext'
import { Button } from '@/commons/ui/button'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground mb-6">You are successfully logged in.</p>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
