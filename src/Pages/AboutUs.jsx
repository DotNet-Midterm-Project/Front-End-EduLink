import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AboutUsImage from "../assets/Home/AboutUsImage.png";
import IntroSection from "../assets/Home/IntroSection.png";
import fadi from "../assets/Home/fadi.png";
import rawan from "../assets/Home/rawan.png";
import Roua from "../assets/Home/Roua.png";
import mustafa from "../assets/Home/mustafa.png";
import mouath from "../assets/Home/mouath.png";
import hassan from "../assets/Home/hassan.png";

const AboutUs = () => {
  // Team data for pagination
  const teamPages = [
    [
      {
        name: "Fadi Alnajjar",
        role: "Full Stack Developer",
        image: fadi,
        linkedin: "https://www.linkedin.com/in/fadi-al-najar/",
      },
      {
        name: "Rawan Yaghmour",
        role: "Full Stack Developer",
        image: rawan,
        linkedin: "https://www.linkedin.com/in/rawan-yaghmour/",
      },
      {
        name: "Muath Mhawich",
        role: "Full Stack Developer",
        image: mouath,
        linkedin: "https://www.linkedin.com/in/muathmhawich/",
      },
      {
        name: "Mustafa Mousa",
        role: "Full Stack Developer",
        image: mustafa,
        linkedin: "https://www.linkedin.com/in/mustafa-raed/",
      },
    ],
    [
      {
        name: "Hassan Karraz",
        role: "Full Stack Developer",
        image: hassan,
        linkedin: "https://www.linkedin.com/in/hassan-karraz/",
      },
      {
        name: "Roua Smesim",
        role: "Full Stack Developer",
        image: Roua,
        linkedin: "https://www.linkedin.com/in/roua-smisem/",
      },
    ],
  ];

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      {/* Render Header */}
      <Header />

      {/* Add space below navbar */}
      <div className="pt-20"></div>

      {/* Sections */}
      <section className="relative bg-[#C8E3F4] p-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-blue-900 mb-4 text-justify">
              Collaborate with volunteers and focus on enhancing student
              success.
            </h1>
            <p className="text-gray-700 font-normal text-lg mb-6 text-justify">
              EduLink connects students with personalized academic support
              through dedicated volunteers, offering the perfect balance of
              convenience and effectiveness.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={IntroSection} alt="Intro Illustration" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white transform origin-bottom-left skew-y-3"></div>
      </section>

      <div className="relative overflow-hidden bg-white py-5 pt-10"></div>

      <section className="relative overflow-hidden bg-white py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-evenly items-center gap-5 lg:flex-row lg:items-start lg:gap-16">
            {/* Image Section */}
            <div className="relative w-full max-w-md">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-orange-50 to-rose-100 rounded-full opacity-20"></div>
                <img src={AboutUsImage} alt="Educational illustration" />
              </div>
            </div>
            {/* Text Section */}
            <div className="flex flex-col items-center md:items-start lg:w-1/2">
              <h2 className="mb-6 text-4xl font-bold sm:text-center md:text-start text-blue-600 md:text-5xl">
                About us
              </h2>
              <p className="mb-8 text-justify pr-12 text-gray-700 text-lg">
                We are a dedicated initiative focused on fostering collaboration
                and support within the academic community. Our platform connects
                individuals seeking knowledge with those eager to share their
                expertise, providing an organized and efficient way to access
                assistance and manage educational events. By empowering both
                learners and contributors, we create an environment where growth
                and learning thrive. With streamlined tools for managing
                sessions, events, and resources, we aim to enhance the overall
                educational experience and help every individual reach their
                full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto bg-[#C8E3F4] rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                EduLink Core Values
              </h2>
              <p className="text-gray-700 text-base leading-relaxed text-justify">
                At EduLink, we believe in connection over isolation and guidance
                over struggle, empowering students through volunteer-driven
                academic support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "💡", label: "Empowerment" },
                { icon: "📖", label: "Accessibility" },
                { icon: "🤝", label: "Collaboration" },
                { icon: "⭐", label: "Impact" },
              ].map((value, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border rounded-lg p-4 bg-white"
                >
                  <div className="text-3xl">{value.icon}</div>
                  <p className="font-semibold text-blue-900">{value.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Meet Our Team
          </h2>
          <p className="text-gray-700 font-normal mb-6">
            Our inspiring team behind the scenes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {teamPages[currentPage].map((member, index) => (
              <div
                key={index}
                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                style={{ height: "450px" }} // ارتفاع الكارد
              >
                {/* تعديل الصورة لتكون متناسبة مع أبعاد الكارد */}
                <div
                  className="w-full"
                  style={{ height: "calc(100% - 150px)" }}
                >
                  {" "}
                  {/* 100% من الكارد باستثناء 150px */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center" // عرض وارتفاع كامل
                  />
                </div>
                {/* جعل المساحة البيضاء للنص تأخذ ارتفاع 150px مع إضافة أيقونة LinkedIn */}
                <div
                  className="text-center flex flex-col justify-center items-center gap-2"
                  style={{ height: "150px" }}
                >
                  <h3 className="font-semibold text-blue-900 text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  {/* أيقونة LinkedIn */}
                  <a
                    href={member.linkedin} // Connects to the LinkedIn profile URL
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer" // Ensures security when opening links in a new tab
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="inline-block"
                    >
                      <path d="M22.225 0H1.771C.791 0 0 .774 0 1.728v20.543C0 23.225.792 24 1.771 24h20.451c.978 0 1.778-.774 1.778-1.728V1.728C24 .774 23.203 0 22.225 0zm-15.5 20.452H3.547V9.081h3.178v11.371zm-1.59-12.92c-1.02 0-1.845-.823-1.845-1.841 0-1.018.824-1.841 1.845-1.841 1.019 0 1.843.823 1.843 1.841 0 1.018-.825 1.841-1.844 1.841zm15.308 12.92h-3.177v-5.562c0-1.327-.027-3.038-1.851-3.038-1.853 0-2.137 1.447-2.137 2.939v5.661h-3.177V9.081h3.051v1.551h.043c.425-.807 1.463-1.654 3.013-1.654 3.223 0 3.817 2.122 3.817 4.883v6.591z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-2">
            {teamPages.map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentPage(pageIndex)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  currentPage === pageIndex
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-900"
                } font-semibold`}
              >
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Render Footer */}
    </>
  );
};

export default AboutUs;
