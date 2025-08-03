import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';

const staticProducts = [
  { id: 'p1', name: 'Product A', mrp: 500, dp: 400, bv: 100 },
  { id: 'p2', name: 'Product B', mrp: 700, dp: 560, bv: 140 },
  { id: 'p3', name: 'Product C', mrp: 1200, dp: 960, bv: 240 },
];

const ActivateProductPage = () => {
  const { userId } = useParams();
  const [quantities, setQuantities] = useState({});

  const handleChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities({ ...quantities, [productId]: qty });
  };

  const handleActivate = (product) => {
    const qty = quantities[product.id] || 1;
    alert(`✅ Activated ${qty} × ${product.name} for user ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-10">
          Activate Products for User <span className="underline">{userId}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl p-6 border border-gray-100 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                  <FaBoxOpen className="text-xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              </div>

              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li><strong>MRP:</strong> ₹{product.mrp}</li>
                <li><strong>DP:</strong> ₹{product.dp}</li>
                <li><strong>BV:</strong> {product.bv}</li>
              </ul>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleChange(product.id, e.target.value)}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 text-center shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <button
                  onClick={() => handleActivate(product)}
                  className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-5 py-2 rounded-xl font-medium hover:scale-105 transition transform duration-200 shadow-md"
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
