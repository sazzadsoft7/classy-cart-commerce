
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, ShoppingBag, Settings, Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="h-5 w-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users className="h-5 w-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside className="bg-primary text-primary-foreground w-64 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-primary-foreground/10">
          <h2 className="text-lg font-bold flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Admin Dashboard
          </h2>
        </div>
        
        <nav className="flex-grow p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isActive 
                        ? "bg-primary-foreground/20 text-primary-foreground" 
                        : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    )
                  }
                  end={item.path === '/admin'}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-primary-foreground/10">
          <NavLink
            to="/"
            className="flex items-center px-3 py-2 rounded-md text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="ml-3">Return to Store</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
