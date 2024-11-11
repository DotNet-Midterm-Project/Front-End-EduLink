//import { Button } from "react-bootstrap/lib/InputGroup"

import AboutUsImage from "../../assets/Home/AboutUsImage.png";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-5 ">
      <div className="md:container mx-auto px-4">
        <div className="flex flex-col  justify-evenly items-center  md:gap-5 lg:flex-row lg:items-start lg:gap-16">
          <div className="relative w-full max-w-md  ">
            <div className="relative aspect-square overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-orange-50 to-rose-100 rounded-full opacity-20 transition-opacity duration-500 group-hover:opacity-40 group-hover:scale-110" />
              <img
                src={AboutUsImage}
                alt="Educational illustration"
                className="relative z-10 rounded-full transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start lg:w-1/2">
            <h1 className="mb-6 text-4xl  font-bold sm:text-center md:text-start text-blue-600 md:text-5xl">
              About us
            </h1>
            <p className="mb-8 font-bold md:pr-12  text-center md:text-start leading-tight text-gray-700">
              We are a dedicated initiative focused on fostering collaboration
              and support within the academic community. Our platform connects
              individuals seeking knowledge with those eager to share their
              expertise, providing an organized and efficient way to access
              assistance and manage educational events. By empowering both
              learners and contributors, we create an environment where growth
              and learning thrive. With streamlined tools for managing sessions,
              events, and resources, we aim to enhance the overall educational
              experience and help every individual reach their full potential.
            </p>
            <button className="bg-orange-500 text-gray-200 hover:text-white mx-auto font-semibold py-2 px-4   rounded-md shadow">
              <span className="transition-transform duration-75 transform hover:scale-105 ">
                Learn more
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
