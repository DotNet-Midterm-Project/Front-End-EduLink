"use client";

import { useState } from "react";

import Cybersecurity_Professional_Analyzing_Global_Data from "../../assets/Home/Cybersecurity_Professional_Analyzing_Global_Data.jpeg";
import Industrial_Control_Room from "../../assets/Home/Industrial_Control_Room.jpeg";
import Studious_Girls_in_Classroom from "../../assets/Home/Studious_Girls_in_Classroom.jpeg";
import Tech_Workspace_with_Programmer from "../../assets/Home/Tech_Workspace_with_Programmer.jpeg";

export default function Component() {
  const [slides, setSlides] = useState([
    Tech_Workspace_with_Programmer,
    Studious_Girls_in_Classroom,
    Industrial_Control_Room,
    Cybersecurity_Professional_Analyzing_Global_Data,
  ]);
  const [texts, setTexts] = useState([
    "Empower Your Learning Journey: Connect with Skilled Volunteers for Tailored Academic Support.",
    "Help fellow students succeed by organizing academic events and providing guidance in your specialty.",
    "Easily find volunteers for academic support, book sessions, and track your progress—all in one place.",
    "Lead the Way: Organize Academic Events and Help Your Peers Succeed.",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move clicked image to the front (first position) and reorder the rest
  const moveToFront = (index) => {
    const reorderedSlides = [...slides];
    const reorderedTexts = [...texts];

    // Remove the clicked image and text, then add it to the front
    const [selectedSlide] = reorderedSlides.splice(index, 1);
    const [selectedText] = reorderedTexts.splice(index, 1);

    // Add the selected slide and text to the beginning of the arrays
    reorderedSlides.unshift(selectedSlide);
    reorderedTexts.unshift(selectedText);

    // Update the state with the new order
    setSlides(reorderedSlides);
    setTexts(reorderedTexts);
    setCurrentIndex(0); // Reset to the first image after reordering
  };

  return (
    <div
      className="relative h-screen w-full flex"
      style={{
        backgroundImage: `url(${slides[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 50%, #0B102F 100%)`,
            filter: "blur(220px)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Left Column */}
      <div className="relative z-10 flex flex-col justify-center items-start px-10 w-1/2 text-white">
        <h1 className="text-[75px] font-bold tracking-wide">EduLink</h1>
        <p className="text-[24px] mt-4 leading-relaxed">
          {texts[currentIndex]}
        </p>
        
        <button className="mt-6 h-10 w-48 text-[20px] font-normal bg-[#F28E33] rounded-lg hover:bg-[#F07E12] hover:shadow-lg transition-all">
          Get Started Now
        </button>
      </div>

      {/* Right Column */}
      <div className="relative z-10 flex flex-col justify-end items-center px-10 w-1/2">
        <div className="flex gap-4 items-end mb-6">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              style={{
                width: index === currentIndex ? "180px" : "163px", // Image size changes here
                height: index === currentIndex ? "270px" : "225px", // Adjust height accordingly
              }}
              className={`object-cover rounded-lg transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "border-4 border-white shadow-lg"
                  : "border-2 border-gray-400 opacity-80"
              }`}
              onClick={() => moveToFront(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}