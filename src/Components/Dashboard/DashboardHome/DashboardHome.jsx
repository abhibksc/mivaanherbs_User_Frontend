import React, { useState, useEffect } from "react";
import {
  FaWallet,
  FaUserFriends,
  FaMedal,
  FaShoppingCart,
  FaHandHoldingUsd,
  FaCoins,
  FaGift,
  FaUsers
} from "react-icons/fa";

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/dashboard-data`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      }
    };

    fetchDashboardData();
  }, []);

  const getValue = (val) => {
    if (!val) return 0;
    if (typeof val === "object" && "$numberDecimal" in val)
      return parseFloat(val.$numberDecimal);
    if (typeof val === "number") return val;
    return Number(val) || 0;
  };

  const cards = [
    { title: "Wallet Balance", value: getValue(data?.wallet_balance), icon: <FaWallet />, color: "from-green-400 to-green-600" },
    { title: "Direct Income", value: getValue(data?.direct_sponsor_income), icon: <FaCoins />, color: "from-blue-400 to-blue-600" },
    { title: "Fighter Income", value: getValue(data?.fighter_income), icon: <FaUserFriends />, color: "from-purple-400 to-purple-600" },
    { title: "Matching Income", value: getValue(data?.matching_income), icon: <FaHandHoldingUsd />, color: "from-yellow-400 to-yellow-600" },
    { title: "Total Withdrawal", value: getValue(data?.total_withdrawal), icon: <FaShoppingCart />, color: "from-red-400 to-red-600" },
    { title: "Total Rewards", value: getValue(data?.total_rewards), icon: <FaMedal />, color: "from-pink-400 to-pink-600" },
    { title: "Total Repurchase", value: getValue(data?.total_repurchase), icon: <FaGift />, color: "from-orange-400 to-orange-600" },
    { title: "Total Referrals", value: getValue(data?.total_referrals), icon: <FaUsers />, color: "from-indigo-400 to-indigo-600" },
    { title: "Pending Activation", value: getValue(data?.total_referrals), icon: <FaUsers />, color: "from-indigo-400 to-indigo-600" },

  ];

  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl shadow-lg bg-gradient-to-br ${card.color} text-white transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-2">{card.icon}</div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-2xl font-bold mt-1">₹ {card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
