import React, { useEffect, useState } from "react";
import axios from "axios";
import "./modalAnimation.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// 🌍 Country list
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
    fighter_user_id: "",
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
          fighter_user_id,
        } = formData;

        const res = await axios.post(`${API_URL}/user-register`, {
          full_name,
          mobile,
          email,
          password,
          other_sponsor_id,
          country_id,
          join_at,
          fighter_user_id,
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
    <div
      className="min-h-screen flex items-center  justify-center p-6 relative bg-cover bg-center"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-20t_yr8El2EpbjFH4yKmlWX8nZ9qnUGWfGGgVzotK3iGcVm0qFVzgPB1Jxr6ghFXvQE&usqp=CAU')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Main Card */}
      <div className="relative max-w-xl w-full bg-white/90 h-dvw backdrop-blur-md rounded-2xl shadow-2xl p-8 animate-fadeIn">
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setActiveTab("login");
              setForgotPasswordMode(false);
            }}
            className={`px-6 py-2 font-bold rounded-l-lg transition-all ${
              activeTab === "login" && !forgotPasswordMode
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab("register");
              setForgotPasswordMode(false);
            }}
            className={`px-6 py-2 font-bold rounded-r-lg transition-all ${
              activeTab === "register"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "register" && !forgotPasswordMode && (
            <>
              <input
                name="full_name"
                placeholder="Full Name"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                name="mobile"
                placeholder="Mobile"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                name="email"
                placeholder="Email"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />

              <select
                name="country_id"
                onChange={handleInput}
                value={formData.country_id}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                name="join_at"
                onChange={handleInput}
                value={formData.join_at}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Position</option>
                <option value="Left">Left</option>
                <option value="Right">Right</option>
              </select>

              <input
                name="fighter_user_id"
                placeholder="Fighter User ID"
                value={formData.fighter_user_id}
                onChange={handleInput}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                name="other_sponsor_id"
                placeholder="Referral ID"
                required
                value={formData.other_sponsor_id}
                onChange={handleInput}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </>
          )}

          {activeTab === "login" && !forgotPasswordMode && (
            <>
              <input
                name="username_or_mobile"
                placeholder="Username or Mobile"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p
                className="text-sm text-blue-700 cursor-pointer underline"
                onClick={() => setForgotPasswordMode(true)}
              >
                Forgot Password?
              </p>
            </>
          )}

          {forgotPasswordMode && (
            <>
              <input
                name="username_or_mobile"
                placeholder="Username or Mobile"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleInput}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <p
                className="text-sm text-blue-700 cursor-pointer underline"
                onClick={() => setForgotPasswordMode(false)}
              >
                Back to Login
              </p>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-bold rounded-lg transition-all shadow-lg ${
              activeTab === "login" && !forgotPasswordMode
                ? "bg-blue-600 hover:bg-blue-700"
                : forgotPasswordMode
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
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

        {/* ✅ Congrats Modal */}
        {showCongratsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md text-center animate-scaleIn">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Success!
              </h2>
              <p className="text-gray-700">
                Hi <strong>{formData.full_name}</strong>, You are successfully
                registered!
                <br />
                Your ID: <strong>{localStorage.getItem("username")}</strong>
                <br />
                Password: <strong>{formData.password}</strong>
              </p>
              <button
                onClick={() => {
                  setShowCongratsModal(false);
                  setActiveTab("login");
                }}
                className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
