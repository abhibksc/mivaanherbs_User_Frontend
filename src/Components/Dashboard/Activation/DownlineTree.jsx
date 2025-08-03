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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Downline Users</h2>
      
      <input
        type="text"
        placeholder="Search by username, name, mobile, or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full"
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No downline users found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li key={user._id}
                onClick={() => navigate(`/dashboard/activate-product/${user.username}`)}
            className="border p-3 rounded shadow-sm">
              <p><strong>ID:</strong> {user._id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Name:</strong> {user.full_name}</p>
              <p><strong>Mobile:</strong> {user.mobile}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Wallet Balance:</strong> ₹{user.wallet_balance}</p>
              <p><strong>Active:</strong> {user.is_active ? 'Yes' : 'No'}</p>
              <p><strong>Created:</strong> {new Date(user.crt_date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownlineTree;
