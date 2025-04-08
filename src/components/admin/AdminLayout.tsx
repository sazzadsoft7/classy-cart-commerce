
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect if not authenticated or not admin
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=admin" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-secondary/30">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
