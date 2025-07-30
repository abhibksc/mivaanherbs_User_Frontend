import React, { useState } from "react";
import vdeoImage from "../../../assets/Images/carousel-1.jpg";

const VideoSection = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (src) => {
    setVideoSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setVideoSrc("");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Video Section */}
      <div
        className="w-full bg-cover bg-center relative my-10"
        style={{ backgroundImage: `url(${vdeoImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center py-16">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Join <span className="text-green-400">Mivaan Herbs</span> –{" "}
                <br />
                <span className="text-yellow-300">Grow Naturally,</span> and{" "}
                <span className="text-green-400">Earn Limitlessly!</span>
              </h1>
              <p className="text-lg italic text-gray-200 mb-6">
                Achieve wellness, earn income, and empower lives through trusted
                herbal products and a powerful MLM opportunity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  "Great Aloevera assortment",
                  "Spices & additives",
                  "Unique accessories",
                  "Good for health & beauty",
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="bg-white rounded-full p-2">
                      <i className="fa fa-check text-green-600 animate-pulse" />
                    </div>
                    <span className="text-base text-white">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
              >
                Explore More
              </a>
            </div>

            {/* Play Button */}
            <div className="flex justify-center lg:justify-end">
              <button
                onClick={() =>
                  openModal("https://www.youtube.com/embed/DWRcNpR6Kdc")
                }
                className="relative w-28 h-28 bg-white text-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 group"
              >
                <i className="fa fa-play text-3xl text-green-600 group-hover:scale-110 transition" />
                <span className="absolute animate-ping w-28 h-28 bg-white rounded-full opacity-60" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-3xl">
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-100">
              <h3 className="text-xl font-semibold text-gray-700">
                Watch Introduction
              </h3>
              <button
                onClick={closeModal}
                className="text-2xl font-bold text-gray-600 hover:text-red-500 transition"
              >
                &times;
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={videoSrc}
                title="Video"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSection;
