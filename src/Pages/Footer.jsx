import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import EduLinkImage from "../assets/Home/EduLinkImage.png";

export default function Footer() {
  return (
    <footer className="bg-[#0D47A1] text-white py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Curved lines background effect */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="#0B102F"  // اللون الأزرق
            fill="none"
            strokeWidth="1"  // زيادة سماكة الخط
          />
          <path
            d="M0,70 Q25,40 50,70 T100,70"
            stroke="#0B102F"  // اللون الأزرق
            fill="none"
            strokeWidth="1.5"  // زيادة سماكة الخط
          />
          {/* <path
            d="M0,90 Q25,60 50,90 T100,90"  // الخط الثالث
            stroke="#0B102F"  // اللون الأزرق
            fill="none"
            strokeWidth="0.2"  // زيادة سماكة الخط
          /> */}
        </svg>
      </div>

      {/* Container */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Logo */}
          <img src={EduLinkImage} alt="EduLink Logo" className="w-24 h-24 object-contain" />

          {/* Slogan */}
          <h2 className="text-xl font-semibold text-white">
            Learn, Volunteer, <span className="text-[#F28E33]">Succeed</span>
          </h2>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-4">
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#F28E33] transition transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-[#0D47A1] text-xl" />
            </a>
            <a
              href="https://instagram.com/"
              aria-label="Instagram"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#F28E33] transition transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-[#0D47A1] text-xl" />
            </a>
            <a
              href="https://LinkedIn.com/"
              aria-label="LinkedIn"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[#F28E33] transition transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="text-[#0D47A1] text-xl" />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <h2 className="text-2xl font-bold text-white">Contact Info</h2>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#0D47A1] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p>Amman-Jordan</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#0D47A1] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Email us</h3>
                <a href="mailto:ifo@edulink.com" className="hover:text-[#F28E33] transition">
                  info@edulink.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faPhone} className="text-[#0D47A1] text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Call us</h3>
                <a href="tel:+96277912234" className="hover:text-[#F28E33] transition">
                  +962 7 7912 1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
