import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaIdCard, FaUserShield, FaUserCircle } from "react-icons/fa";

const KYC = () => {
  const [kycStatus, setKycStatus] = useState(null);
  const [files, setFiles] = useState({
    aadhar_front: null,
    aadhar_back: null,
    pan: null,
    user_img: null,
  });
  const [basicInfo, setBasicInfo] = useState({ dob: "", gender: "" });

  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchKycStatus = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/get-kyc-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setKycStatus(data.data);
        setBasicInfo({
          dob: data.data.dob || "",
          gender: data.data.gender || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const handleFileUpload = async (docType, file) => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", docType);

    try {
      await axios.post(`${BASE_URL}/user/upload-doc`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchKycStatus();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleBasicInfoSubmit = async () => {
    if (!basicInfo.dob || !basicInfo.gender || !files.user_img) {
      return alert("Please fill all fields and upload photo");
    }

    const formData = new FormData();
    formData.append("docType", "basic_info");
    formData.append("dob", basicInfo.dob);
    formData.append("gender", basicInfo.gender);
    formData.append("file", files.user_img);

    try {
      await axios.post(`${BASE_URL}/user/upload-doc`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchKycStatus();
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  const renderStatus = (status) =>
    status ? (
      <span className="text-green-600 font-semibold">Verified ✅</span>
    ) : (
      <span className="text-red-600 font-semibold">Not Verified ❌</span>
    );

  const renderImage = (url) =>
    
    
    url && (
      <img
        src={url}
        alt="Uploaded Document"
        className="w-32 h-auto rounded border mt-2"
      />
    );

  return (
    <div className="mx-auto p-6 space-y-8">
      {/* KYC Status Section */}
      <div className="bg-white shadow rounded-lg p-5 border border-gray-200">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <FaUserShield className="text-blue-600" />
          KYC Status
        </h2>
        <p className="text-gray-700">
          <strong>Aadhaar:</strong> {renderStatus(kycStatus?.aadhar_verified)}
        </p>
        <p className="text-gray-700">
          <strong>PAN:</strong> {renderStatus(kycStatus?.pan_verified)}
        </p>
        <p className="text-gray-700">
          <strong>Basic Info:</strong> {renderStatus(kycStatus?.basic_info_verified)}
        </p>
      </div>

      {/* Aadhaar Section */}
      <div className="bg-white shadow rounded-lg p-5 border border-gray-200 space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaIdCard className="text-green-600" />
          Aadhaar Details <span className="text-red-500">
            ({kycStatus?.aadhar_verified ? "Varified" : "Not Varified yet"})
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Front
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFiles({ ...files, aadhar_front: e.target.files[0] })
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
            
            {renderImage(kycStatus?.aadhar_front_img)}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Back
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFiles({ ...files, aadhar_back: e.target.files[0] })
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
            {renderImage(kycStatus?.aadhar_back_img)}
          </div>
        </div>
        <button
          onClick={() => {
            handleFileUpload("aadhar_front", files.aadhar_front);
            handleFileUpload("aadhar_back", files.aadhar_back);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Submit Aadhaar
        </button>
      </div>

      {/* PAN Section */}
      <div className="bg-white shadow rounded-lg p-5 border border-gray-200 space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaIdCard className="text-yellow-500" />
          PAN Details  <span className="text-red-500">
            ({kycStatus?.pan_verified ? "Varified" : "Not Varified yet"})
          </span>
        </h3>
        <input
          type="file"
          onChange={(e) => setFiles({ ...files, pan: e.target.files[0] })}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        {renderImage(kycStatus?.pan_img)}
        <button
          onClick={() => handleFileUpload("pan", files.pan)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Submit PAN
        </button>
      </div>

      {/* Basic Info Section */}
      <div className="bg-white shadow rounded-lg p-5 border border-gray-200 space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FaUserCircle className="text-purple-600" />
          Basic Info <span className="text-red-500">
            ({kycStatus?.basic_info_verified ? "Varified" : "Not Varified yet"})
          </span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              value={basicInfo.dob}
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, dob: e.target.value })
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={basicInfo.gender}
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, gender: e.target.value })
              }
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFiles({ ...files, user_img: e.target.files[0] })
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
            {renderImage(kycStatus?.user_img)}
          </div>
        </div>
        <button
          onClick={handleBasicInfoSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Submit Info
        </button>
      </div>
    </div>
  );
};

export default KYC;
