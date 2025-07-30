import React from "react";
import NewProduct from "../../../assets/Images/newProduct.jpg";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    image: NewProduct,
    title: "Nature close Aloevera",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "₹2,083.00",
    DP: "₹1,670.00",
    Bv: "₹16.5",
  },
];

const Store = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-lg italic font-medium text-green-600">Online Store</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2">
          Want to stay healthy? Choose Aloevera taste
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              {/* Star Ratings */}
              <div className="flex justify-center mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
              <p className="text-gray-600 mb-3 text-sm">{product.description}</p>

              {/* Price Section */}
              <div className="space-y-1 text-green-700 text-md font-semibold">
                <p>MRP: <span className=" text-red-500">{product.price}</span></p>
                <p>DP: {product.DP}</p>
                <p>Bv: {product.Bv}</p>
              </div>
            </div>

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex items-center justify-center transition duration-300">
              <Link to={`/product/${product.id}`}>
                <button className="bg-green-600 text-white rounded-full px-6 py-2 hover:bg-green-700 transition-all duration-200">
                  More Detail <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 transition duration-200">
          View More Products
        </button>
      </div>
    </section>
  );
};

export default Store;
