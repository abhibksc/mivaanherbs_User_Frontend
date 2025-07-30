import React from "react";

const products = [
  {
    id: 1,
    name: "Herbal Boost Kit",
    price: "₹4,999",
    description:
      "A perfect starter kit packed with natural herbs, immunity boosters, and detox solutions. Ideal for new users entering the world of wellness.",
  },
  {
    id: 2,
    name: "Premium Wellness Box",
    price: "₹10,999",
    description:
      "Loaded with premium Ayurvedic products, essential oils, and health drinks. Designed for those serious about transforming their health.",
  },
  {
    id: 3,
    name: "Elite Entrepreneur Kit",
    price: "₹14,999",
    description:
      "Includes all premium products, marketing brochures, digital tools, and mentorship access to grow your business in our network.",
  },
];

const JoinUs = () => {
  return (
    <div className="bg-gray-50 py-10 px-4 md:px-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">Join Our Network Marketing Revolution</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover your path to financial freedom and wellness. Our unique products and proven business model help thousands build a better life.
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-green-700 mb-2">
              {product.name}
            </h2>
            <p className="text-lg font-semibold text-gray-700 mb-4">
             MRP : {product.price}
            </p>
            <p className="text-gray-600">{product.description}</p>
            <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Join with this Kit
            </button>
          </div>
        ))}
      </div>

      {/* Article Section */}
      <div className="bg-white shadow-lg p-8 rounded-2xl max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Why Join Our Network?</h2>
        <p className="text-gray-700 leading-relaxed">
          In a world where job security is no longer guaranteed, network marketing has emerged as a powerful tool for individuals to take control of their income.
          By joining our mission, you get access to high-quality herbal and wellness products, a dedicated support system, and training modules that guide you to success.
        </p>

        <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2">
          <li>✅ Low investment, high return opportunity</li>
          <li>✅ Mentorship from top leaders in the industry</li>
          <li>✅ Automated tools and weekly training webinars</li>
          <li>✅ Be your own boss and work on your terms</li>
        </ul>

        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
