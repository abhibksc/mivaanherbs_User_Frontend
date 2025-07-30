import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import product1 from "../../../assets/Images/store-product-1.jpg";
import product2 from "../../../assets/Images/store-product-2.jpg";
import product3 from "../../../assets/Images/store-product-3.jpg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const products = [
  {
    id: 1,
    image: product1,
    title: "Nature close Aloevera",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "$19.00",
    amount: 1900,
  },
  {
    id: 2,
    image: product2,
    title: "Green Aloevera tulsi",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "$19.00",
    amount: 1900,
  },
  {
    id: 3,
    image: product3,
    title: "Instant Aloevera premix",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "$19.00",
    amount: 1900,
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
    const packageAmount = product.amount;

    try {
      const res = await fetch(`${BASE_URL}/user/activate`, {
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
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 object-cover h-96"
        />
        <div className="p-6 md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-green-700 font-semibold text-xl mb-6">{product.price}</p>

          <button
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
            onClick={() => setShowModal(true)}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
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
