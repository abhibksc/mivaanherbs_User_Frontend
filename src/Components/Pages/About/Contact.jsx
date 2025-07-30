import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg italic text-green-600 font-medium">Contact Us</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">Contact us right now</h2>
        <p className="text-gray-600 mb-12">
          Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
          sed stet lorem sit clita duo justo. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-green-600 text-white text-xl">
              <FaEnvelope />
            </div>
            <p className="text-gray-700">Mivaanherbspvtltd@gmail.com</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-green-600 text-white text-xl">
              <FaPhone />
            </div>
            <p className="text-gray-700">+91 6205131757</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-green-600 text-white text-xl">
              <FaMapMarkerAlt />
            </div>
            <p className="text-gray-700"> 16, 2nd Floor, Dubash Bldg, Tribhovan Rd</p>
            <p className="text-gray-700">Off Lamington Road, Delhi</p>
          </div>
        </div>

        <form className="max-w-2xl mx-auto space-y-4 text-left">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
