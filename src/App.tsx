import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './shared/contexts/AuthContext'
import Login from './features/auth/pages/Login'
import Dashboard from './features/dashboard/pages/Dashboard'
import AdminUsers from './features/admin/users/pages/AdminUsers'
import AdminRoles from './features/admin/roles/pages/AdminRoles'
import AdminSettings from './features/admin/settings/pages/AdminSettings'
import ProtectedRoute from './routes/ProtectedRoute'
import MainLayout from './commons/layout/MainLayout'
import './App.css'

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="App bg-white min-h-screen">
      <Routes>
        {/* Public route */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <AdminUsers />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/roles" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <AdminRoles />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <AdminSettings />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Root redirect */}
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />
        
        {/* Catch all - redirect to dashboard if authenticated, otherwise to login */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
