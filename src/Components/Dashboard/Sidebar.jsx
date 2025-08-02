import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  LineChart,
  Users,
  ShieldCheck,
  Scale,
  Store,
  Gift,
  User,
  LogOut,
  Menu,
  LineChartIcon
} from 'lucide-react';

const modules = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Wallet', path: '/dashboard/wallet', icon: <Wallet className="w-5 h-5" /> },
  { name: 'Income', path: '/dashboard/incomeLogs', icon: <LineChart className="w-5 h-5" /> },
  { name: 'Team', path: '/dashboard/myteam', icon: <LineChartIcon className="w-5 h-5" /> },

  // { name: 'Direct Sponsor Income', path: '/dashboard/directSponsor', icon: <Users className="w-5 h-5" /> },
  // { name: 'Fighter Income', path: '/dashboard/fighterIncome', icon: <ShieldCheck className="w-5 h-5" /> },
  // { name: 'Matching Income', path: '/dashboard/matchingIncome', icon: <Scale className="w-5 h-5" /> },
  { name: 'Store', path: '/store', icon: <Store className="w-5 h-5" /> },
  { name: 'Refer & Earn', path: '/dashboard/reffer&earn', icon: <Gift className="w-5 h-5" /> },
  { name: 'Profile', path: '/dashboard/profile', icon: <User className="w-5 h-5" /> },
  { name: 'Logout', path: '/authentication', icon: <LogOut className="w-5 h-5" /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Toggle button (Mobile only) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-800 text-white rounded"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full md:h-screen w-64 z-40 bg-gradient-to-b from-indigo-800 via-indigo-900 to-gray-900 text-white p-6 shadow-xl
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide" onClick={()=>{
          
          navigate("/dashboard/profile")
           closeSidebar()
          }}>🛠 User</h2>

        <div className="space-y-3">
          {modules.map((mod) => {
            const isActive = location.pathname === mod.path;

            return (
              <button
                key={mod.name}
                onClick={() => {
                  navigate(mod.path);
                  closeSidebar(); // auto-close on mobile
                }}
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
    </>
  );
};

export default Sidebar;
