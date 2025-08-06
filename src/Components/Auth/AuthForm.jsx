import React, { useEffect, useState } from "react";
import axios from "axios";
import "./modalAnimation.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Country list
const countries = [
  { id: "IN", name: "India" },
  { id: "US", name: "United States" },
  { id: "GB", name: "United Kingdom" },
  { id: "CA", name: "Canada" },
  { id: "AU", name: "Australia" },
  { id: "DE", name: "Germany" },
  { id: "FR", name: "France" },
  { id: "BR", name: "Brazil" },
  { id: "ZA", name: "South Africa" },
  { id: "JP", name: "Japan" },
];

const AuthForm = () => {
  const { refId } = useParams();
  const navigate = useNavigate();

  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [registeredData, setRegisteredData] = useState({});
  const [activeTab, setActiveTab] = useState("login");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    newPassword: "",
    other_sponsor_id: "",
    country_id: "",
    join_at: "",
    username_or_mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (refId) {
      localStorage.setItem("other_sponsor_id", refId);
    }

    setFormData((prev) => ({
      ...prev,
      other_sponsor_id: refId || localStorage.getItem("other_sponsor_id"),
    }));

    localStorage.removeItem("token");

    localStorage.removeItem("full_name");

    localStorage.removeItem("username");
    localStorage.removeItem("other_sponsor_id");
    localStorage.removeItem("MYsponsor_id");
    toast.warn("Please SignUp or Login!");
  }, [refId, navigate]);

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
      if (forgotPasswordMode) {
        const { username_or_mobile, newPassword } = formData;
        const res = await axios.post(`${API_URL}/forgot-password`, {
          username_or_mobile,
          newPassword,
        });
        toast.success(res.data.message);
        setForgotPasswordMode(false);
        setFormData((prev) => ({ ...prev, password: "", newPassword: "" }));
      } else if (activeTab === "register") {
        const {
          full_name,
          mobile,
          email,
          password,
          other_sponsor_id,
          country_id,
          join_at,
        } = formData;
        const res = await axios.post(`${API_URL}/user-register`, {
          full_name,
          mobile,
          email,
          password,
          other_sponsor_id,
          country_id,
          join_at,
        });

        setMessage(res.data.message || "Registered successfully");
        localStorage.setItem("username", res.data.username);
        localStorage.removeItem("other_sponsor_id");

        setRegisteredData({ ...res.data, password });
        setShowCongratsModal(true);
      } else {
        const { username_or_mobile, password } = formData;
        const res = await axios.post(`${API_URL}/user-login`, {
          username_or_mobile,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.userName);
        localStorage.setItem("full_name", res.data.full_name);

        localStorage.setItem("MYsponsor_id", res.data.userName);
        localStorage.removeItem("other_sponsor_id");

        setMessage("Login successful");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto mt-10 p-6 bg-white relative">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setActiveTab("login");
            setForgotPasswordMode(false);
          }}
          className={`px-4 py-2 font-semibold ${
            activeTab === "login" && !forgotPasswordMode
              ? "text-white bg-blue-600"
              : "bg-gray-100 text-gray-700"
          } rounded-l`}
        >
          Login
        </button>
        <button
          onClick={() => {
            setActiveTab("register");
            setForgotPasswordMode(false);
          }}
          className={`px-4 py-2 font-semibold ${
            activeTab === "register"
              ? "text-white bg-green-600"
              : "bg-gray-100 text-gray-700"
          } rounded-r`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "register" && !forgotPasswordMode && (
          <>
            <input name="full_name" placeholder="Full Name" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input name="mobile" placeholder="Mobile" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input name="email" placeholder="Email" onChange={handleInput} required className="w-full p-2 border rounded" />
            <select name="country_id" onChange={handleInput} value={formData.country_id} required className="w-full p-2 border rounded">
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
            <select name="join_at" onChange={handleInput} value={formData.join_at} required className="w-full p-2 border rounded">
              <option value="">Select Position</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
            <input name="other_sponsor_id" placeholder="Referral ID" required value={formData.other_sponsor_id} onChange={handleInput} className="w-full p-2 border rounded" />
            <input type="password" name="password" placeholder="Password" onChange={handleInput} required className="w-full p-2 border rounded" />
          </>
        )}

        {activeTab === "login" && !forgotPasswordMode && (
          <>
            <input name="username_or_mobile" placeholder="Username or Mobile" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input type="password" name="password" placeholder="Password" onChange={handleInput} required className="w-full p-2 border rounded" />
            <p className="text-sm text-blue-600 cursor-pointer underline" onClick={() => setForgotPasswordMode(true)}>
              Forgot Password?
            </p>
          </>
        )}

        {forgotPasswordMode && (
          <>
            <input name="username_or_mobile" placeholder="Username or Mobile" onChange={handleInput} required className="w-full p-2 border rounded" />
            <input type="password" name="newPassword" placeholder="New Password" onChange={handleInput} required className="w-full p-2 border rounded" />
            <p className="text-sm text-blue-600 cursor-pointer underline" onClick={() => setForgotPasswordMode(false)}>
              Back to Login
            </p>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-bold rounded ${
            activeTab === "login" && !forgotPasswordMode ? "bg-blue-600" : forgotPasswordMode ? "bg-yellow-600" : "bg-green-600"
          } hover:opacity-90`}
        >
          {loading
            ? "Please wait..."
            : forgotPasswordMode
            ? "Reset Password"
            : activeTab === "login"
            ? "Login"
            : "Register"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}

{showCongratsModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
      {/* Green checkmark icon inside circle */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Done Text */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Done!</h2>

      {/* Message Text */}
      <p className="text-gray-700">
        Hi <strong>{formData.full_name}</strong>, You are successfully registered with us.
        <br />
        Your ID No. is <strong>{localStorage.getItem("username")}</strong> and Password is <strong>{formData.password}</strong>.
        <br />
        Please login to access your profile.
      </p>

      {/* OK Button */}
      <button
        onClick={() => {
          setShowCongratsModal(false);
          setActiveTab("login");
        }}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        OK
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default AuthForm;
