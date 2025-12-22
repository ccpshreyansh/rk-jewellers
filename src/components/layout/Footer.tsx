/* eslint-disable @next/next/no-html-link-for-pages */
// components/Footer.tsx

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-gray-200 pt-20 pb-10 px-6 sm:px-12"
      style={{
        background:
          "linear-gradient(135deg, #2a0707 0%, #4a0f0b 50%, #2a0707 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* App Download */}
        <div>
          <p className="mb-5 text-sm tracking-wide text-[#F6ECDC]">
            Download The{" "}
            <span className="text-[#CDC087] font-semibold">
              RK Gold App
            </span>{" "}
            Now
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Play Store */}
            <a
              href="https://play.google.com/store/apps/details?id=com.instalaxmi.rajkishore&hl=en_IN"
              className="flex items-center gap-4 px-5 py-4 rounded-2xl
              bg-white/5 backdrop-blur border border-white/10
              hover:border-[#CDC087]/40
              hover:shadow-[0_0_25px_rgba(205,192,135,0.25)]
              transition-all duration-300"
            >
              <FaGooglePlay size={26} className="text-[#CDC087]" />
              <div>
                <p className="text-xs text-gray-300">Download on the</p>
                <p className="text-sm font-semibold text-[#F6ECDC]">
                  Play Store
                </p>
              </div>
            </a>

            {/* App Store */}
            <a
              href="https://apps.apple.com/in/app/rk-gold/id6751413150"
              className="flex items-center gap-4 px-5 py-4 rounded-2xl
              bg-white/5 backdrop-blur border border-white/10
              hover:border-[#CDC087]/40
              hover:shadow-[0_0_25px_rgba(205,192,135,0.25)]
              transition-all duration-300"
            >
              <FaApple size={26} className="text-[#CDC087]" />
              <div>
                <p className="text-xs text-gray-300">Download on the</p>
                <p className="text-sm font-semibold text-[#F6ECDC]">
                  App Store
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-2xl font-semibold tracking-wide text-[#F6ECDC] mb-4">
            RK Jewellers
          </h3>
          <p className="text-sm text-[#EADDC7] leading-relaxed">
            Jewellery that celebrates tradition and tells your story.
          </p>

          {/* Socials */}
          <div className="flex space-x-5 mt-6 text-sm">
            <a href="https://facebook.com/rajkishoregoldjewelry" className="hover:text-[#CDC087] transition">
              <FaFacebookF />
            </a>
            {/* <a href="#" className="hover:text-[#CDC087] transition">
              <FaTwitter />
            </a> */}
            <a href="https://instagram.com/rkjewellers_buxar" className="hover:text-[#CDC087] transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#CDC087] transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-[#F6ECDC]">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-[#EADDC7]">
            <li><a href="/" className="hover:text-[#CDC087] transition">Home</a></li>
            <li><a href="/categories" className="hover:text-[#CDC087] transition">Categories</a></li>
            <li><a href="/about" className="hover:text-[#CDC087] transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-[#CDC087] transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-[#F6ECDC]">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-[#EADDC7] leading-relaxed">
            <li>
               RajKishore Gold Jewellery Pvt. Ltd., Purana Chowk, Near R.K. Sarees, Buxar, Bihar - 802101
            </li>
            <li>+91 9572031045</li>
            <li>rajkishoregoldjewellery@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-[#EADDC7]">
        &copy; {new Date().getFullYear()} RK Jewellers. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
