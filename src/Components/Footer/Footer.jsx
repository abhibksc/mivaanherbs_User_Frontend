import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Our Office */}
        <div>
          <h4 className="text-green-400 text-xl font-semibold mb-4">Our Office</h4>
          <p className="flex items-start gap-2 mb-2 text-sm">
            <FaMapMarkerAlt className="text-green-400 mt-1" />
            16, 2nd Floor, Dubash Bldg, Tribhovan Rd, Off Lamington Road, Delhi
          </p>
          <p className="flex items-center gap-2 mb-2 text-sm">
            <FaPhoneAlt className="text-green-400" />
            +91 6205131757
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-green-400" />
            Mivaanherbspvtltd@gmail.com
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=61577730700458"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-600 hover:bg-green-700 flex items-center justify-center rounded-full transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=yu9yz1g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-600 hover:bg-green-700 flex items-center justify-center rounded-full transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com/@mivaanherbspvtltd?si=nmi9Up8DAq5h5HW0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-600 hover:bg-green-700 flex items-center justify-center rounded-full transition"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-600 hover:bg-green-700 flex items-center justify-center rounded-full transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-600 hover:bg-green-700 flex items-center justify-center rounded-full transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-green-400 text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Our Services</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Support</a></li>
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="text-green-400 text-xl font-semibold mb-4">Business Hours</h4>
          <div className="text-sm space-y-2">
            <p>Monday - Friday</p>
            <h6 className="text-gray-300">09:00 am - 07:00 pm</h6>
            <p>Saturday</p>
            <h6 className="text-gray-300">09:00 am - 12:00 pm</h6>
            <p>Sunday</p>
            <h6 className="text-gray-300">Closed</h6>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-green-400 text-xl font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Your email"
              className="w-full py-3 px-4 pr-28 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm transition">
              SignUp
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-400">
        <p>
          &copy; <span className="text-white font-medium">Mivaan Herbs Pvt Ltd</span>, All Rights Reserved. <br />
          Designed By{" "}
          <a
            href="https://itgenixs.com/"
            className="text-green-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            IT GENIXS
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
