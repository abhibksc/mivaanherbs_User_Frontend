import React from "react";
import testimonial1 from "../../../assets/Images/testimonial-1.jpg";
import testimonial2 from "../../../assets/Images/testimonial-2.jpg";
import testimonial3 from "../../../assets/Images/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    image: testimonial1,
    text: "Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    name: "Client Name",
    profession: "Profession",
  },
  {
    id: 2,
    image: testimonial2,
    text: "Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo.",
    name: "Client Name",
    profession: "Profession",
  },
  {
    id: 3,
    image: testimonial3,
    text: "Diam dolor diam ipsum sit. Clita erat ipsum et lorem et sit. Sed stet lorem sit clita duo justo.",
    name: "Client Name",
    profession: "Profession",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-400 text-white">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <p className="text-lg italic font-medium">Testimonial</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2">
          What our clients say about our Aloevera
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center px-4 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white text-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full"
          >
            <p className="mb-4 text-sm italic">"{testimonial.text}"</p>
            <div className="flex items-center mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 object-cover rounded-full border-2 border-green-500"
              />
              <div className="ml-4 text-left">
                <h5 className="font-semibold">{testimonial.name}</h5>
                <span className="text-green-700 text-sm">{testimonial.profession}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
