import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { 
      LayoutDashboard, 
      Package, 
      Truck, 
      Users, 
      ShoppingBag,
      Settings 
    } from 'lucide-react';

    const menuItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
      { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
      { icon: Package, label: 'Inventory', path: '/admin/inventory' },
      { icon: Truck, label: 'Deliveries', path: '/admin/deliveries' },
      { icon: Users, label: 'Customers', path: '/admin/customers' },
      { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    export const AdminSidebar: React.FC = () => {
      const location = useLocation();

      return (
        <aside className="w-64 bg-white h-screen shadow-md">
          <nav className="mt-8">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-[#EBEBDA] hover:text-[#777A55] ${
                        isActive ? 'bg-[#EBEBDA] text-[#777A55]' : ''
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      );
    };
