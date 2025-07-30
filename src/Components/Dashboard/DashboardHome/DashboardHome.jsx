import React, { useState, useEffect } from 'react';

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/dashboard-data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const result = await res.json();
        console.log(result);
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      }
    };

    fetchDashboardData();
  }, []);

  // Utility to safely extract number
  const getValue = (val) => {
    if (!val) return 0;
    if (typeof val === 'object' && '$numberDecimal' in val) return parseFloat(val.$numberDecimal);
    if (typeof val === 'number') return val;
    return Number(val) || 0;
  };

  const cards = [
    { title: 'Wallet Balance', value: getValue(data?.wallet_balance), color: 'text-green-600' },
    { title: 'Direct Income', value: getValue(data?.direct_sponsor_income), color: 'text-blue-600' },
    { title: 'Fighter Income', value: getValue(data?.fighter_income), color: 'text-purple-600' },
    { title: 'Matching Income', value: getValue(data?.matching_income), color: 'text-yellow-600' },
    { title: 'Total Withdrawal', value: getValue(data?.total_withdrawal), color: 'text-red-600' },
    { title: 'Total Rewards', value: getValue(data?.total_rewards), color: 'text-pink-600' },
    { title: 'Total Repurchase', value: getValue(data?.total_repurchase), color: 'text-orange-600' },
    { title: 'Total Referrals', value: getValue(data?.total_referrals), color: 'text-indigo-600' },
  ];

  return (
    <div className="flex w-full">
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-bold mb-2">{card.title}</h2>
              <p className={`text-2xl font-semibold ${card.color}`}>₹ {card.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
