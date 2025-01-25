import React from 'react';
    import { Outlet } from 'react-router-dom';
    import { AdminSidebar } from './AdminSidebar';
    import { AdminHeader } from './AdminHeader';

    export const AdminLayout: React.FC = () => {
      return (
        <div className="min-h-screen bg-gray-100">
          <AdminHeader />
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-8">
              <Outlet />
            </main>
          </div>
        </div>
      );
    };
