import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
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
  LineChartIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const modules = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },


   {
    name: "My Profile",
    icon: <LineChart className="w-5 h-5" />,
    children: [
      { name: "My Profile", path: "/dashboard/profile" },
      { name: "Kyc", path: "/dashboard/kyc" },
    ],
  },



    {
    name: "Geology",
    icon: <LineChart className="w-5 h-5" />,
    children: [
      { name: "My Team", path: "/dashboard/my-team" },
      { name: "My Geology", path: "/dashboard/mygeo" },
    ],
  },




    {
    name: "Wallet",
    icon: <Wallet className="w-5 h-5" />,
    children: [
      { name: "Order Fund", path: "/dashboard/Orderfund" },
      { name: "Fund Request", path: "/dashboard/fundrequest" },
      { name: "Activation", path: "/dashboard/userList" },
      { name: "Repurchase", path: "/dashboard/repurchase" },

    ],
  },


  
 
  {
    name: "Income",
    icon: <LineChart className="w-5 h-5" />,
    children: [
      { name: "Income Logs", path: "/dashboard/incomeLogs" },
      { name: "Direct Sponsor", path: "/dashboard/directSponsor" },
      { name: "Fighter Income", path: "/dashboard/fighterIncome" },
      { name: "Matching Income", path: "/dashboard/matchingIncome" },
    ],
  },
  { name: "Store", path: "/store", icon: <Store className="w-5 h-5" /> },
  {
    name: "Refer & Earn",
    path: "/dashboard/reffer&earn",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    name: "Logout",
    path: "/authentication",
    icon: <LogOut className="w-5 h-5" />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const userId = localStorage.getItem("username");
  const full_name = localStorage.getItem("full_name");


  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const toggleExpand = (name) => {
    setExpanded((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Mobile toggle button */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-800 text-white rounded"
        >
          <Menu />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full md:h-screen w-64 z-40 bg-gradient-to-b from-green-800 via-black-900 to-gray-900 text-white  shadow-xl
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      >
        {/* User Info */}
        <div
          onClick={() => {
            navigate("/dashboard/profile");
            closeSidebar();
          }}
          className="mb-6 p-2 border-b-2 flex items-center gap-3 cursor-pointer bg-indigo-500"
        >
          <img
            src={logo}
            alt="User"
            className="w-16 h-16 rounded-full border-2 object-contain border-white"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{full_name}</h3>
            <p className="text-sm text-gray-300">{userId}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {modules.map((mod) => {
            const isActive = location.pathname === mod.path;
            const isParentActive = mod.children?.some(
              (child) => location.pathname === child.path
            );
            const isExpanded = expanded === mod.name;

            return (
              <div key={mod.name}>
                <button
                  onClick={() => {
                    if (mod.children) {
                      toggleExpand(mod.name);
                    } else if (mod.path) {
                      navigate(mod.path);
                      closeSidebar();
                    }
                  }}
                  className={`flex items-center justify-between gap-2 px-4 py-3 w-full text-left rounded-lg transition duration-200 
                    ${
                      isActive || isParentActive
                        ? "bg-green-600 text-white shadow-md"
                        : "hover:bg-green-700 hover:text-white text-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {mod.icon}
                    <span className="text-md font-medium">{mod.name}</span>
                  </div>
                  {mod.children &&
                    (isExpanded ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    ))}
                </button>

                {mod.children && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {mod.children.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <button
                          key={child.name}
                          onClick={() => {
                            navigate(child.path);
                            closeSidebar();
                          }}
                          className={`block text-left w-full px-3 py-2 rounded-md text-sm transition
                            ${
                              isChildActive
                                ? "bg-indigo-500 text-white"
                                : "hover:bg-indigo-700 text-gray-300"
                            }`}
                        >
                          {child.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
