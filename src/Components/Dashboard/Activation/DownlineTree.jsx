import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DownlineTree = () => {
  const [downlineUsers, setDownlineUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDownline = async () => {
      const token = localStorage.getItem('token');
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/user/get-downline-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDownlineUsers(res.data.data);
      } catch (error) {
        console.error('Failed to fetch downline:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownline();
  }, []);

  const filteredUsers = downlineUsers.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username?.toLowerCase().includes(query) ||
      user.full_name?.toLowerCase().includes(query) ||
      user.mobile?.includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-800 p-4 sm:p-6 text-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">🌐 Downline Users</h2>

      <input
        type="text"
        placeholder="🔍 Search by username, name, mobile, or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 w-full px-4 py-3 text-sm sm:text-base text-black rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {loading ? (
        <p className="text-center text-lg animate-pulse">Loading downline users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-lg">🚫 No downline users found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/dashboard/activate-product/${user.username}`)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-xl p-5 cursor-pointer transition transform hover:scale-[1.015] duration-300 shadow-md hover:shadow-xl"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-purple-300">{user.username}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  user.is_active
                    ? 'bg-green-200 text-green-900'
                    : 'bg-red-200 text-red-900'
                }`}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-sm"><span className="font-semibold text-purple-200">Name:</span> {user.full_name}</p>
              <p className="text-sm"><span className="font-semibold text-purple-200">Mobile:</span> {user.mobile}</p>
              <p className="text-sm"><span className="font-semibold text-purple-200">Email:</span> {user.email}</p>
              <p className="text-sm"><span className="font-semibold text-purple-200">Wallet:</span> ₹{user.wallet_balance}</p>
              <p className="text-xs mt-2"><span className="font-semibold text-purple-200">Created:</span> {new Date(user.crt_date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownlineTree;
