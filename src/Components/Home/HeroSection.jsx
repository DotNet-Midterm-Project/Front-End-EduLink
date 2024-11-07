"use client";

import { useState, useEffect } from "react";

import Cybersecurity_Professional_Analyzing_Global_Data from "../../assets/Home/Cybersecurity_Professional_Analyzing_Global_Data.jpeg";
import Industrial_Control_Room from "../../assets/Home/Industrial_Control_Room.jpeg";
import Studious_Girls_in_Classroom from "../../assets/Home/Studious_Girls_in_Classroom.jpeg";
import Tech_Workspace_with_Programmer from "../../assets/Home/Tech_Workspace_with_Programmer.jpeg";

export default function Component() {
  const [curr, setCurr] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  const texts = [
    "Cybersecurity Professional Analyzing Global Data",
    "Industrial Control Room",
    "Studious Girls in Classroom",
    "Tech Workspace with Programmer",
  ];
  const slides = [
    Cybersecurity_Professional_Analyzing_Global_Data,
    Industrial_Control_Room,
    Studious_Girls_in_Classroom,
    Tech_Workspace_with_Programmer,
  ];

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [curr]);

  useEffect(() => {
    const slideInterval = setInterval(next, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 z-10 flex h-2/3 w-11/12 -translate-x-1/2 -translate-y-1/2 flex-col justify-between text-white sm:h-2/3 sm:w-2/3 md:left-10 md:w-1/2 md:translate-x-0 ">
        <h1 className="text-center text-5xl font-bold tracking-wider sm:text-left sm:text-7xl md:text-8xl lg:text-9xl">
          EduLinke
        </h1>
        <p
          className={`absolute text-2xl font-bold transition-all duration-300 sm:text-3xl md:text-4xl ${
            fadeIn ? "translate-y-48 opacity-0" : "translate-y-36 opacity-90"
          }`}
        >
          {texts[curr]}
        </p>
        <div className="mt-10 sm:mt-20">
          <button className="rounded-2xl border-2 border-orange-600 px-4 py-2 text-lg font-bold text-white shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:border-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 sm:text-2xl">
            Get Started Now
          </button>
        </div>
      </div>
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="h-screen w-full  flex-shrink-0">
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex  items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full text-center  h-8 w-8 bg-white/10  text-gray-800 shadow hover:bg-white"
          aria-label="Previous slide"
        >
          <span className="text-2xl  rounded-full w-full h-full mb-1  p-1 flex  items-center justify-center sm:text-3xl">
            &#8592;
          </span>{" "}
          {/* Left Arrow */}
        </button>
        <button
          onClick={next}
          className="rounded-full text-center  h-8 w-8 bg-white/10  text-gray-800 shadow hover:bg-white"
          aria-label="Next slide"
        >
          <span className="text-2xl  rounded-full w-full h-full mb-1  p-1 flex  items-center justify-center sm:text-3xl">
            &#8594;
          </span>{" "}
          {/* Right Arrow */}
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurr(i)}
              className={`h-2 w-2 cursor-pointer rounded-full bg-white transition-all ${
                curr === i ? "p-1.5" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
