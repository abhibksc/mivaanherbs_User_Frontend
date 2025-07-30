import React from "react";
import product1 from "../../../assets/Images/store-product-1.jpg";
import product2 from "../../../assets/Images/store-product-2.jpg";
import product3 from "../../../assets/Images/store-product-3.jpg";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    image: product1,
    title: "Nature close Aloevera",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "$19.00",
  },
  {
    id: 2,
    image: product2,
    title: "Green Aloevera tulsi",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "$19.00",
  },
  {
    id: 3,
    image: product3,
    title: "Instant Aloevera premix",
    description:
      "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
    price: "$19.00",
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="relative bg-white border rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300"
          >
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
            <div className="p-5">
              <div className="flex justify-center mb-3 text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
              <h4 className="text-green-700 text-lg font-bold">{product.price}</h4>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition duration-300">
            <Link to={`/product/${product.id}`}>
  <button className="bg-green-600 text-white rounded-full px-5 py-2 m-2 hover:bg-green-700 transition">
    More Detail <i className="fas fa-arrow-right ml-2"></i>
  </button>
</Link>
           
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 transition">
          View More Products
        </button>
      </div>
    </section>
  );
};

export default Store;
