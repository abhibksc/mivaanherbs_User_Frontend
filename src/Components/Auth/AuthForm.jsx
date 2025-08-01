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
  // Add more as needed
];

const AuthForm = () => {
  const { refId } = useParams();
  const navigate = useNavigate();

  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [registeredData, setRegisteredData] = useState({});
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    other_sponsor_id: "",
    country_id: "",
    join_at: "", // <-- New field
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
     localStorage.removeItem("username");
     localStorage.removeItem("other_sponsor_id");
     localStorage.removeItem("MYsponsor_id");
toast.warn("Please SingUp or Login!")


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
      if (activeTab === "register") {
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
        localStorage.setItem("MYsponsor_id", res.data.MYsponsor_id);
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
          onClick={() => setActiveTab("login")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "login"
              ? "text-white bg-blue-600"
              : "bg-gray-100 text-gray-700"
          } rounded-l`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("register")}
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
        {activeTab === "register" && (
          <>
            <input
              name="full_name"
              placeholder="Full Name"
              onChange={handleInput}
              required
              className="w-full p-2 border rounded"
            />

            <input
              name="mobile"
              placeholder="Mobile"
              onChange={handleInput}
              required
              className="w-full p-2 border rounded"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleInput}
              required
              className="w-full p-2 border rounded"
            />

            {/* Country dropdown */}
            <select
              name="country_id"
              onChange={handleInput}
              value={formData.country_id}
              required
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            >
              <option value="">Select Position</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>

            <input
              name="other_sponsor_id"
              placeholder="Referral ID"
              required
              value={formData.other_sponsor_id}
              onChange={handleInput}
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
              required
              className="w-full p-2 border rounded"
            />
          </>
        )}

        {activeTab === "login" && (
          <>
            <input
              name="username_or_mobile"
              placeholder="Username or Mobile"
              onChange={handleInput}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
              required
              className="w-full p-2 border rounded"
            />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-bold rounded ${
            activeTab === "login" ? "bg-blue-600" : "bg-green-600"
          } hover:opacity-90`}
        >
          {loading
            ? "Please wait..."
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full animate-bounceIn">
            <h2 className="text-2xl font-bold text-green-600 text-center mb-2">
              🎉 Congratulations!
            </h2>
            <p className="text-center text-gray-700">
              {registeredData.message}
            </p>

            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>
                <strong>Username:</strong> {registeredData.username}
              </p>
              <p>
                <strong>Password:</strong> {registeredData.password}
              </p>
            </div>

            <button
              onClick={() => {
                setShowCongratsModal(false);
                setActiveTab("login");
              }}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
