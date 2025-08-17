import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import product1 from "../../../assets/Images/newProduct.jpg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const products = [
  {
    id: 1,
    image: product1,
    title: "MIVAAN HERB",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "₹2,083.00",
    DP: "₹1,670.00",
    BP: "₹16.7",
    amount: 2083,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  const handleConfirmPurchase = async () => {
    setLoading(true);

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const packageAmount = product.DP;

    if(!token){

      navigate("/authentication")

    }

    try {
      
      const res = await fetch(`${BASE_URL}/user/purchase-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, packageAmount }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setShowModal(false);
        setShowCongrats(true);
        setTimeout(() => {
          setShowCongrats(false);
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(data.error || "Activation failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found</p>;
  }

  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 max-h-[400px]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4 text-sm">{product.description}</p>

            <div className="space-y-1 mb-6">
              <p className="text-gray-700 text-md">
                <span className="font-semibold">MRP:</span>{" "}
                <span className="line-through text-red-500">{product.price}</span>
              </p>
              <p className="text-green-700 text-lg font-bold">DP: {product.DP}</p>
              <p className="text-blue-700 text-md font-medium">Bv: {product.BP}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Purchase</h3>
            <p className="mb-4">
              Are you sure you want to activate this product for{" "}
              <strong>{product.price}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Congrats Modal */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
            <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Congratulations!</h2>
            <p className="text-gray-700">
              Your purchase was successful. You’ll be redirected to your dashboard shortly.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
