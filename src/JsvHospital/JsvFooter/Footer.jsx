import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          <div className="mb-4 md:mb-0 flex-1">
            <h2 className="text-lg text-gray-300 ">Location</h2>
            <p className="mt-2 flex items-center text-gray-400">
              <FaMapMarkerAlt className="mr-2" /> Bollikunta,
              Hanmakonda-Warangal Road
            </p>
            <p className="text-gray-400">Warangal, Telangana</p>
          </div>
          <div className="mb-4 md:mb-0 flex-1">
            <h2 className="text-lg text-gray-300">Contact Us</h2>
            <p className="mt-2  flex items-center text-gray-400">
              <FaPhone className="mr-2 hover:text-white" /> +91 12345 67890
            </p>
            <p className="mt-2 flex items-center text-gray-400">
              <FaEnvelope className="mr-2 hover:text-white" /> info@example.com
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-lg p-2 text-gray-300">Follow Us</h2>
            <div className="flex space-x-6 mt-2">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
