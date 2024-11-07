// import {
//   MapPin,
//   Mail,
//   Phone,
//   Facebook,
//   Instagram,
//   Linkedin,
// } from "lucide-react";
import EduLinkImage from "../assets/Home/EduLinkImage.png";



export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-12 px-6 md:px-12 relative overflow-hidden">
  {/* Curved lines background effect */}
  <div className="absolute inset-0 opacity-10">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,50 Q25,30 50,50 T100,50" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M0,70 Q25,50 50,70 T100,70" stroke="currentColor" fill="none" strokeWidth="2" />
    </svg>
  </div>

  <div className="container mx-auto grid md:grid-cols-2 gap-12 relative z-10">
    {/* Left Column */}
    <div className="flex flex-col items-center space-y-8">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className=" p-2 rounded">
          <img
        src={EduLinkImage}
        alt="Article"
        className="w-2/3 h-2/3 object-cover"
      />
          </div>
        </div>
        <h2 className="text-2xl">
          Learn, Volunteer, <span className="text-orange-500">Succeed</span>
        </h2>
      </div>

      <div className="space-y-4 text-center">
        <h3 className="text-xl">Follow us</h3>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-orange-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2H6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V6a4 4 0 00-4-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8" />
            </svg>
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 3a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H6zm3 2h6v6H9V5zm0 8h6v6H9v-6z" />
            </svg>
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 110 12 6 6 0 010-12zm-7 12H5V10h4v10zm-2-14a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-bold text-center">Contact info</h2>
      <div className="space-y-6 text-center">
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 110 12 6 6 0 010-12zm-7 12H5V10h4v10zm-2-14a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>Amman-Jordan</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9 6 9-6M21 12l-9 6-9-6" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Email us</h3>
            <a href="mailto:ifo@edulink.com" className="hover:text-orange-500 transition-colors">
              ifo@edulink.com
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V6zm0 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm9-8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V6zm0 8a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zm0 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Call us</h3>
            <a href="tel:+96277912234" className="hover:text-orange-500 transition-colors">
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
