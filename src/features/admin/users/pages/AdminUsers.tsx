import React from 'react'
import UsersDataTable from '../components/UsersDataTable'

const AdminUsers: React.FC = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage user accounts, roles, and permissions
        </p>
      </div>
      
      <div className="bg-white rounded-lg border p-6">
        <UsersDataTable />
      </div>
    </>
  )
}

export default AdminUsers
