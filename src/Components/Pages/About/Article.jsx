import React from "react";

const Article = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <div className="relative group overflow-hidden rounded-2xl shadow-xl">
          <img
            className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
            src="https://firebasestorage.googleapis.com/v0/b/wipenexit-48482.appspot.com/o/director.png?alt=media&token=1b04a17d-01cd-4655-b02f-02012e424a64"
            alt="Mivaan Director"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Right - Content */}
        <div className="space-y-6">
          <div>
            <p className="text-green-700 text-base font-semibold italic mb-2">Featured Article</p>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-snug">
              The History of <span className="text-green-700">Mivaan Herbs</span> in the World
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed text-[17px]">
            <p>
              Over the past decade, Mivaan Herbs has grown into a trusted name in the herbal MLM industry. Our journey
              began with a vision to bring pure, effective herbal products to every home while opening doors of financial
              freedom to people from all walks of life.
            </p>
            <p>
              Today, we proudly stand on a strong foundation of trust, transparency, and transformation — delivering both
              health benefits and a reliable earning platform to thousands of families.
            </p>
            <p>
              For the past 10 years, Mivaan Herbs has built a legacy rooted in trust, quality, and growth. Our commitment
              to delivering premium herbal products, backed by science and tradition, has earned us thousands of
              satisfied customers and partners across the country.
            </p>
            <p>
              More than just a brand, we are a movement — empowering individuals with financial freedom, personal
              development, and a healthier lifestyle.
            </p>
          </div>

          <a
            href="/articles"
            className="inline-block px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-md transition duration-300"
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Article;
