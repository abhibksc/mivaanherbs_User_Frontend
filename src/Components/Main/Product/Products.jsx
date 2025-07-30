import React from "react";
import { useNavigate } from "react-router-dom";

import product1 from "../../../assets/Images/product-1.jpg";
import product2 from "../../../assets/Images/product-2.jpg";
import product3 from "../../../assets/Images/product-3.jpg";
import product4 from "../../../assets/Images/product-4.jpg";

const productData = [
  {
    image: product1,
    title: "Green Aloevera",
    description:
      "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
  },
  {
    image: product2,
    title: "Black Aloevera",
    description:
      "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
  },
  {
    image: product3,
    title: "Spiced Aloevera",
    description:
      "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
  },
  {
    image: product4,
    title: "Organic Aloevera",
    description:
      "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
  },
];

const Products = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate("/store");
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <p className="text-green-700 italic font-medium text-lg">Our Products</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Our Health Care Products have a complex positive effect on the body
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {productData.map((product, index) => (
          <a
            key={index}
            href="#"
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 -mt-6 bg-white relative z-10 mx-4 rounded-lg shadow-sm text-center">
              <h4 className="text-xl font-semibold text-green-700 mb-2">
                {product.title}
              </h4>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleViewMore}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          View More Products
        </button>
      </div>
    </section>
  );
};

export default Products;
