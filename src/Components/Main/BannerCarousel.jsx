import React from "react";
import ImageCarousel from "../Utility/ImageCarousel";
import banner1 from "../../assets/Images/banner1.jpg";
import banner2 from "../../assets/Images/banner-2.avif";
import banner3 from "../../assets/Images/banner-3.avif";
import banner4 from "../../assets/Images/banner-4.jpg";

const BannerCarousel = () => {
  const bannerImages = [
    { src: banner1, text: "Welcome to Mivaan Herbs" },
    { src: banner2, text: "Naturally Pure & Herbal" },
    { src: banner3, text: "Ayurvedic Wellness for All" },
    { src: banner4, text: "Holistic Healing Begins Here" },
  ];

  return (
    <div className="">
      <ImageCarousel images={bannerImages} autoplayInterval={3000} />
    </div>
  );
};

export default BannerCarousel;
