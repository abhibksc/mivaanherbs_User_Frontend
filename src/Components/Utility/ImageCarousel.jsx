import React from "react";
import { Carousel } from "primereact/carousel";
import PropTypes from "prop-types";

const ImageCarousel = ({
  images,
  numVisible = 1,
  numScroll = 1,
  autoplayInterval = 3000,
  responsiveOptions = [],
}) => {
  const itemTemplate = (image, index) => (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <img
        src={image.src}
        alt={`carousel-${index}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Centered Animated Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-5xl font-bold text-center px-4 animate-zoomOut">
          {image.text}
        </h1>
      </div>
    </div>
  );

  const customCarouselStyles = `
    .p-carousel-indicators, .p-carousel-prev, .p-carousel-next {
      display: none !important;
    }
  `;

  return (
    <>
      <style>{customCarouselStyles}</style>
      <Carousel
        value={images}
        numVisible={numVisible}
        numScroll={numScroll}
        itemTemplate={itemTemplate}
        circular
        autoplayInterval={autoplayInterval}
        responsiveOptions={responsiveOptions}
      />
    </>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      text: PropTypes.string,
    })
  ).isRequired,
  numVisible: PropTypes.number,
  numScroll: PropTypes.number,
  autoplayInterval: PropTypes.number,
  responsiveOptions: PropTypes.array,
};

export default ImageCarousel;
