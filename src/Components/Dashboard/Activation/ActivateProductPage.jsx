import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import product1 from '../../../assets/Images/newProduct.jpg'

const staticProducts = [
  {
    id: "p1",
    name: "Product A",
    mrp: 2083.00,
    dp: 1670.00,
    bv: 16.7,
    image: product1
  },
];


const ActivateProductPage = () => {
  const { userId } = useParams();
  const [quantities, setQuantities] = useState({});
const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

const handleChange = (productId, value) => {
  setErrorMessage(""); // clear error when user starts typing
  const qty = Math.max(1, parseInt(value) || 1);
  setQuantities({ ...quantities, [productId]: qty });
};


const handleActivate = async (product) => {
  const qty = quantities[product.id] || 1;
  const token = localStorage.getItem('token');

  if (!token) {
    alert('User is not authenticated.');
    return;
  }

  const payload = {
   Other_userId : userId,
    productId: product.id,
    quantity: qty,
    name: product.name,
    mrp: product.mrp,
    dp: product.dp,
    bv: product.bv,
  };

try {
  setErrorMessage(""); // reset previous error
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || result?.message || 'Activation failed.');
  }

  if (result.message === "User activated and incomes distributed successfully.") {
    alert(`✅ ${result.message}`);
    navigate("/dashboard/userList");
  }
} catch (err) {
  setErrorMessage(err.message || "Something went wrong.");
}

};




  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          Activate Products for
          <span className="block text-indigo-800 text-lg font-semibold mt-1">
            {userId}
          </span>
        </h2>

        {errorMessage && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
    <strong className="font-bold">Error:</strong> <span>{errorMessage}</span>
  </div>
)}


        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {staticProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-5 border border-gray-100 transition-all duration-300"
            >
             <div className="w-full h-96 bg-white border rounded-xl mb-4 overflow-hidden flex items-center justify-center">
  <img
    src={product.image}
    alt={product.name}
    className="max-h-full max-w-full object-contain"
  />
</div>


              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                  <FaBoxOpen className="text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
              </div>

              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li>
                  <strong>MRP:</strong> ₹{product.mrp}
                </li>
                <li>
                  <strong>DP:</strong> ₹{product.dp}
                </li>
                <li>
                  <strong>BV:</strong> {product.bv}
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleChange(product.id, e.target.value)}
                  className="w-full sm:w-24 border border-gray-300 rounded-lg px-3 py-2 text-center shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                />
                <button
                  onClick={() => handleActivate(product)}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition transform duration-200 shadow-md text-sm"
                >
                  Activate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivateProductPage;
