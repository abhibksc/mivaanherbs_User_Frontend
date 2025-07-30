import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    password: '',
    referal_id: '',
    country_id: '',
    username_or_mobile: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // ✅ Use Vite environment variable
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {


      if (activeTab === 'register') {
        const { full_name, mobile, email, password, referal_id, country_id } = formData;
        const res = await axios.post(`${API_URL}/user-register`, {
          full_name, mobile, email, password, referal_id, country_id
        });
        setMessage(res.data.message || 'Registered successfully');
        localStorage.setItem('username', res.data.username);

        setActiveTab('login');




      } 
      
      
      
      else {
        const { username_or_mobile, password } = formData;
        const res = await axios.post(`${API_URL}/user-login`, {
          username_or_mobile, password
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.userName);
        setMessage('Login successful');
        window.location.href = '/'; // redirect as needed
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto mt-10 p-6 bg-white">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('login')}
          className={`px-4 py-2 font-semibold ${activeTab === 'login' ? 'text-white bg-blue-600' : 'bg-gray-100 text-gray-700'} rounded-l`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`px-4 py-2 font-semibold ${activeTab === 'register' ? 'text-white bg-green-600' : 'bg-gray-100 text-gray-700'} rounded-r`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'register' && (
          <>
            <input name="full_name" placeholder="Full Name" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input name="mobile" placeholder="Mobile" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input name="email" placeholder="Email" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input name="country_id" placeholder="Country ID" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input name="referal_id" placeholder="Referral ID (Optional)" onChange={handleInput} className="w-full p-2 border rounded" />
            <input type="password" name="password" placeholder="Password" onChange={handleInput} required className="w-full p-2 border rounded" />
          </>
        )}

        {activeTab === 'login' && (
          <>
            <input name="username_or_mobile" placeholder="Username or Mobile" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input type="password" name="password" placeholder="Password" onChange={handleInput} required className="w-full p-2 border rounded" />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-bold rounded ${activeTab === 'login' ? 'bg-blue-600' : 'bg-green-600'} hover:opacity-90`}
        >
          {loading ? 'Please wait...' : activeTab === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default AuthForm;
