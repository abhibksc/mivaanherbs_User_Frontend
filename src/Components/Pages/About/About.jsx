import React from 'react';

import about1 from "../../../assets/Images/about-1.jpg";
import about2 from "../../../assets/Images/about-2.jpg";
import about3 from "../../../assets/Images/about-3.jpg";
import about4 from "../../../assets/Images/about-4.jpg";
import about5 from "../../../assets/Images/about-5.jpg";
import about6 from "../../../assets/Images/about-6.jpg";



const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-green-700 text-lg italic font-medium">About Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            The success history of Mivaan Herbs in 10 years
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 text-end">
              <img src={about1} alt="About 1" className="w-full bg-white shadow rounded" />
              <img src={about3} alt="About 3" className="w-1/2 bg-white shadow rounded mx-auto" />
            </div>
            <div className="space-y-4">
              <img src={about4} alt="About 4" className="w-1/2 bg-white shadow rounded mx-auto" />
              <img src={about2} alt="About 2" className="w-full bg-white shadow rounded" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-10">
            {/* First Section */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <img src={about5} alt="Empowering Lives" className="w-full bg-white shadow rounded" />
              </div>
              <div className="md:w-2/3">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  A Decade of Empowering Lives Through Wellness and Financial Freedom Together
                </h4>
                <p className="text-gray-600">
                  Mivaan Herbs has been transforming lives for over 10 years by blending the power of Ayurveda
                  with an ethical and rewarding MLM system. Our mission has always been two-fold — to promote
                  natural wellness and to create sustainable income opportunities for every individual.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300" />

            {/* Second Section */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-2/3">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Celebrating 10 Years of Trust, Growth, Herbal Excellence, and Opportunity
                </h4>
                <p className="text-gray-600">
                  Thousands have joined us on this journey, achieving better health and financial independence.
                  We believe in building a future where health and wealth go hand in hand — naturally, ethically,
                  and with trust.
                </p>
              </div>
              <div className="md:w-1/3">
                <img src={about6} alt="Celebration" className="w-full bg-white shadow rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
