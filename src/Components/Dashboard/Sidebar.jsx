import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart2, ShoppingCart, Box, LayoutDashboard } from 'lucide-react'; // Lucide icons

const modules = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Wallet', path: '/dashboard/wallet', icon: <BarChart2 className="w-5 h-5" /> },
  { name: 'Income Logs', path: '/dashboard/incomeLogs', icon: <BarChart2 className="w-5 h-5" /> },
  { name: 'Direct Sponsor Income', path: '/dashboard/directSponsor', icon: <BarChart2 className="w-5 h-5" /> },
  { name: 'Fighter Income', path: '/dashboard/fighterIncome', icon: <BarChart2 className="w-5 h-5" /> },
  { name: 'Matching Income', path: '/dashboard/matchingIncome', icon: <BarChart2 className="w-5 h-5" /> },




];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-indigo-800 via-indigo-900 to-gray-900 text-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">🛠 User</h2>

      <div className="space-y-3">
        {modules.map((mod) => {
          const isActive = location.pathname === mod.path;

          return (
            <button
              key={mod.name}
              onClick={() => navigate(mod.path)}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition duration-200 
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'hover:bg-indigo-700 hover:text-white text-gray-200'
                }`}
            >
              {mod.icon}
              <span className="text-md font-medium">{mod.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
