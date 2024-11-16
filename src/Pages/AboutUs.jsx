
import React from "react";
import Header from "./Header"; // Your existing header component
import Footer from "./Footer"; // Your existing footer component
import TeamCard from "./TeamCard"; // For team members
import AboutUsImage from "../assets/Home/AboutUsImage.png";

const AboutUs = () => {
    return (
        <>
            <Header />

            {/* Intro Section */}
            <section className="bg-blue-100 text-center p-10">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-blue-900 mb-4">
                        Collaborate with volunteers and focus on enhancing student success.
                    </h1>
                    <p className="text-gray-700 text-lg mb-6">
                        EduLink connects students with personalized academic support through dedicated volunteers, offering the perfect balance of convenience and effectiveness.
                    </p>
                    <img
                        src="/images/intro-illustration.png"
                        alt="Intro Illustration"
                        className="mx-auto w-1/2"
                    />
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <img
                        src="AboutUsImage"
                        alt="About Us"
                        className="w-full md:w-1/2 rounded-lg shadow-lg"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">About Us</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            We are dedicated to fostering collaboration and support within the educational community. Our platform enables personalized academic support from dedicated volunteers, helping students reach their full potential.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-12 bg-blue-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">EduLink Core Values</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["Empowerment", "Accessibility", "Collaboration", "Impact"].map(
                            (value, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-blue-900"
                                >
                                    <div className="bg-blue-200 p-4 rounded-full mb-2">
                                        <span className="text-3xl">🌟</span> {/* Replace with icons */}
                                    </div>
                                    <p className="font-semibold">{value}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: "Hassan Karraz", role: "Full Stack Developer" },
                            { name: "Fadi Alnajjar", role: "Full Stack Developer" },
                            { name: "Muath Mhawich", role: "Full Stack Developer" },
                            { name: "Mustafa Mousa", role: "Full Stack Developer" },
                        ].map((member, index) => (
                            <TeamCard key={index} name={member.name} role={member.role} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-blue-600 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">
                    Start Achieving Your Academic Goals Today.
                </h2>
                <p className="text-lg mb-6">
                    EduLink is free for all students. Advanced features for enhanced volunteer management are also available!
                </p>
                <button className="bg-orange-500 px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-orange-600 transition">
                    Get Started Now
                </button>
            </section>

            <Footer />
        </>
    );
};

export default AboutUs;
