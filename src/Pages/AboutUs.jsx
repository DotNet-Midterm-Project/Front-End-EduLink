import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AboutUsImage from "../assets/Home/AboutUsImage.png";
import IntroSection from "../assets/Home/IntroSection.png";
import fadi from "../assets/Home/fadi.png";
import rawan from "../assets/Home/rawan.jpg";
import mustafa from "../assets/Home/mustafa.jpeg";
import mouath from "../assets/Home/mouath.png";
import hassan from "../assets/Home/hassan.jpeg";

const AboutUs = () => {
    // Team data for pagination
    const teamPages = [
        [
            { name: "Fadi Alnajjar", role: "Full Stack Developer", image: fadi },
            { name: "Rawan Yaghmour", role: "Full Stack Developer", image: rawan },
            { name: "Muath Mhawich", role: "Full Stack Developer", image: mustafa },
            { name: "Mustafa Mousa", role: "Full Stack Developer", image: mouath },
        ],
        [
            { name: "Hassan Karraz", role: "Full Stack Developer", image: hassan },
            { name: "Roua Smesim", role: "Designer", image: rawan },
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
                        <h1 className="text-3xl font-bold text-blue-900 mb-4">
                            Collaborate with volunteers and focus on enhancing student success.
                        </h1>
                        <p className="text-gray-700 font-bold text-lg mb-6">
                            EduLink connects students with personalized academic support through dedicated volunteers, offering the perfect balance of convenience and effectiveness.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src={IntroSection}
                            alt="Intro Illustration"
                            className="w-3/4 max-w-md rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-16 bg-white transform origin-bottom-left skew-y-3"></div>
            </section>

            <section className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <img
                        src={AboutUsImage}
                        alt="About Us"
                        className="w-full md:w-1/2 rounded-lg shadow-lg"
                    />
                    <div>
                        <h2 className="text-4xl font-bold text-blue-900 mb-4">About Us</h2>
                        <p className="text-gray-700 text-lg font-bold leading-relaxed">
                            We are dedicated to fostering collaboration and support within the educational community. Our platform enables personalized academic support from dedicated volunteers, helping students reach their full potential.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto bg-[#C8E3F4] rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-xl font-bold text-blue-900 mb-4">EduLink Core Values</h2>
                            <p className="text-gray-700 text-base leading-relaxed">
                                At EduLink, we believe in connection over isolation and guidance over struggle,
                                empowering students through volunteer-driven academic support.
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
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Meet Our Team</h2>
                    <p className="text-gray-700 font-bold mb-6">Our inspiring team behind the scenes. Join us!</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {teamPages[currentPage].map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="w-full h-48">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-semibold text-blue-900 text-lg mb-1">{member.name}</h3>
                                    <p className="text-sm text-gray-600">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6 gap-2">
                        {teamPages.map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => setCurrentPage(pageIndex)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === pageIndex
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
