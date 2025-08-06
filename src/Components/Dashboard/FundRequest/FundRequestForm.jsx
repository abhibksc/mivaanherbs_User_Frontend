import React, { useEffect, useState } from "react";
import axios from "axios";

const FundRequestForm = () => {
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [requests, setRequests] = useState([]);
  const [fetchingRequests, setFetchingRequests] = useState(false);

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      setFetchingRequests(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/get-all-fundRequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(res.data.data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setFetchingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !screenshot) {
      setMessage("Please provide both amount and screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("screenshot", screenshot);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/fundRequest`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message || "Request submitted successfully!");
      setAmount("");
      setScreenshot(null);
      setModalOpen(false);
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
          "An error occurred while submitting request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-50 to-white py-10 px-4">
      <div className="max-w-full mx-auto bg-white p-8 shadow-xl rounded-2xl border border-indigo-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">
            📄 Your Fund Requests
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md transition"
          >
            + Generate Request
          </button>
        </div>

        {message && (
          <div className="bg-yellow-50 text-yellow-800 text-sm px-4 py-2 rounded mb-4 border border-yellow-200">
            {message}
          </div>
        )}

        {fetchingRequests ? (
          <p className="text-sm text-gray-500">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-gray-400">No requests found.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:shadow transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-700">
                    💰 <span className="font-semibold">Amount:</span> ₹
                    {req.amount}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  Requested on: {new Date(req.requested_at).toLocaleString()}
                </p>

                <div className="mt-3 space-y-2">
                  <img
                    src={req.screenshot}
                    alt="screenshot"
                    className="w-48 h-auto rounded border"
                  />

                  <div className="flex gap-3">
                    <a
                      href={req.screenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline font-medium"
                    >
                      🔍 View
                    </a>

                    <a
                      href={req.screenshot}
                      download={`fund_screenshot_${req._id}.jpg`}
                      className="text-sm text-green-600 hover:underline font-medium"
                    >
                      ⬇️ Download
                    </a>
                  </div>
                </div>

                {req.reason && (
                  <p className="text-xs text-red-500 mt-2">
                    ❗ Reason: {req.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl space-y-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold text-indigo-700">
              Generate Fund Request
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                  required
                  min={1}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                  className="mt-1 text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundRequestForm;
