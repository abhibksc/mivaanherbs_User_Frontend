import React, { useEffect, useState } from 'react';
import {
  User,
  Smartphone,
  Mail,
  Globe,
  Users,
  Wallet,
  CheckCircle,
  XCircle,
  Calendar,
  Activity,
  GitBranch
} from 'lucide-react';

const InfoItem = ({ icon: Icon, label, value, color = "text-gray-800" }) => (
  <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg px-4 py-3 shadow-sm transition">
    <Icon className="w-5 h-5 text-indigo-500" />
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  </div>
);

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getProfile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-4 text-center animate-pulse">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-indigo-700">👤 User Profile</h2>
        <p className="text-sm text-gray-500">Here’s a summary of your account information</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Info */}
        <InfoItem icon={User} label="Full Name" value={user.full_name} />
        <InfoItem icon={User} label="Username" value={user.username} />
        <InfoItem icon={Mail} label="Email" value={user.email} />
        <InfoItem icon={Smartphone} label="Mobile" value={user.mobile} />
        <InfoItem icon={Globe} label="Country ID" value={user.country_id} />

        {/* Sponsor Info */}
        <InfoItem icon={Users} label="My Sponsor ID" value={user.MYsponsor_id} />
        <InfoItem icon={Users} label="Other Sponsor ID" value={user.other_sponsor_id} />
        <InfoItem icon={Users} label="Referred By" value={user.referred_by} />

        {/* MLM Info */}
        <InfoItem icon={GitBranch} label="Left User" value={user.left_user || "N/A"} />
        <InfoItem icon={GitBranch} label="Right User" value={user.right_user || "N/A"} />
        <InfoItem icon={Activity} label="Left BV" value={user.left_bv} />
        <InfoItem icon={Activity} label="Right BV" value={user.right_bv} />

        {/* Wallet & Incomes */}
        <InfoItem icon={Wallet} label="Wallet Balance" value={`₹${user.wallet_balance}`} />
        <InfoItem icon={Wallet} label="Direct Sponsor Income" value={`₹${user.direct_sponsor_income}`} />
        <InfoItem icon={Wallet} label="Fighter Income" value={`₹${user.fighter_income}`} />
        <InfoItem icon={Wallet} label="Matching Income" value={`₹${user.matching_income}`} />

        {/* Meta */}
        <InfoItem
          icon={user.is_active ? CheckCircle : XCircle}
          label="Account Status"
          value={user.is_active ? '✅ Active' : '❌ Inactive'}
          color={user.is_active ? "text-green-600" : "text-red-500"}
        />
        <InfoItem icon={User} label="Created By" value={user.crt_by} />
        <InfoItem icon={Calendar} label="Created At" value={new Date(user.crt_date).toLocaleString()} />
      </div>

      {/* Upline Path Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">📶 Upline Path</h3>
        {user.upline_path && user.upline_path.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.upline_path.map((uplineId, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full"
              >
                {uplineId}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No upline path available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
