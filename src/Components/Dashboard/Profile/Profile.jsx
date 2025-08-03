import React, { useEffect, useState } from 'react';
import {
  User,
  Globe,
  Banknote,
  FileText,
  Users
} from 'lucide-react';

const EditableField = ({ label, value, onChange, name, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="px-4 py-2 mt-1 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner transition-all"
    />
  </div>
);

const UserProfile = () => {
  const [data, setData] = useState(null);
  const [editingSection, setEditingSection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/getProfile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (section, field) => (e) => {
    setEditingSection(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.value,
      },
    }));
  };

  const handleSave = async (section) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateSection`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ section, data: editingSection[section] }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setData(prev => ({ ...prev, [section]: updated[section] }));
      setEditingSection(prev => ({ ...prev, [section]: undefined }));
      alert(`${section} updated successfully!`);
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <div className="text-center py-6 text-lg font-medium text-gray-600 animate-pulse">Loading profile...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  const { user, address, bank, kyc, nominee } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-10 bg-gradient-to-b from-white via-slate-50 to-slate-100 rounded-2xl shadow-xl">
      <h2 className="text-4xl font-bold text-indigo-700 mb-2 text-center">👤 User Profile</h2>

      {/* USER INFO */}
      <Section title="Basic Info" icon={<User className="text-indigo-500" />}>
        <EditableField label="Full Name" value={editingSection.user?.full_name ?? user.full_name} onChange={handleChange('user', 'full_name')} />
        <EditableField label="Email" value={editingSection.user?.email ?? user.email} onChange={handleChange('user', 'email')} />
        <EditableField label="Mobile" value={editingSection.user?.mobile ?? user.mobile} onChange={handleChange('user', 'mobile')} />
        <SaveButton onClick={() => handleSave('user')} />
      </Section>

      {/* ADDRESS */}
      <Section title="Address" icon={<Globe className="text-indigo-500" />}>
        <EditableField label="Address Line" value={editingSection.address?.address_line ?? address?.[0]?.address_line ?? ''} onChange={handleChange('address', 'address_line')} />
        <EditableField label="City" value={editingSection.address?.city ?? address?.[0]?.city ?? ''} onChange={handleChange('address', 'city')} />
        <EditableField label="State" value={editingSection.address?.state ?? address?.[0]?.state ?? ''} onChange={handleChange('address', 'state')} />
        <EditableField label="Zip Code" value={editingSection.address?.pin_code ?? address?.[0]?.pin_code ?? ''} onChange={handleChange('address', 'pin_code')} />
        <EditableField label="Country" value={editingSection.address?.country ?? address?.[0]?.country ?? ''} onChange={handleChange('address', 'country')} />
        <SaveButton onClick={() => handleSave('address')} />
      </Section>

      {/* BANK */}
      <Section title="Bank Details" icon={<Banknote className="text-indigo-500" />}>
        <EditableField label="Account Holder Name" value={editingSection.bank?.account_holder_name ?? bank?.account_holder_name ?? ''} onChange={handleChange('bank', 'account_holder_name')} />
        <EditableField label="Account Number" value={editingSection.bank?.account_number ?? bank?.account_number ?? ''} onChange={handleChange('bank', 'account_number')} />
        <EditableField label="IFSC Code" value={editingSection.bank?.ifsc_code ?? bank?.ifsc_code ?? ''} onChange={handleChange('bank', 'ifsc_code')} />
        <EditableField label="Bank Name" value={editingSection.bank?.bank_name ?? bank?.bank_name ?? ''} onChange={handleChange('bank', 'bank_name')} />
        <SaveButton onClick={() => handleSave('bank')} />
      </Section>

      {/* KYC */}
      <Section title="KYC Details" icon={<FileText className="text-indigo-500" />}>
        <EditableField label="Aadhaar Number" value={editingSection.kyc?.aadhaar_number ?? kyc?.aadhaar_number ?? ''} onChange={handleChange('kyc', 'aadhaar_number')} />
        <EditableField label="PAN Number" value={editingSection.kyc?.pan_number ?? kyc?.pan_number ?? ''} onChange={handleChange('kyc', 'pan_number')} />
        <SaveButton onClick={() => handleSave('kyc')} />
      </Section>

      {/* NOMINEE */}
      <Section title="Nominee Details" icon={<Users className="text-indigo-500" />}>
        <EditableField label="Nominee Name" value={editingSection.nominee?.nominee_name ?? nominee?.nominee_name ?? ''} onChange={handleChange('nominee', 'nominee_name')} />
        <EditableField label="Relationship" value={editingSection.nominee?.relationship ?? nominee?.relationship ?? ''} onChange={handleChange('nominee', 'relationship')} />
        <EditableField label="Mobile" value={editingSection.nominee?.mobile ?? nominee?.mobile ?? ''} onChange={handleChange('nominee', 'mobile')} />
        <SaveButton onClick={() => handleSave('nominee')} />
      </Section>
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3 mb-5 border-b pb-3 border-indigo-100">
      <div className="bg-indigo-100 p-2 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

const SaveButton = ({ onClick }) => (
  <div className="md:col-span-2 text-right">
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-sm"
    >
      Save Changes
    </button>
  </div>
);

export default UserProfile;
