import AboutUsImage from "../../assets/Home/AboutUsImage.png";

export default function AboutSection() {
  return (
    <>
      {/* White space above the section */}
      <div className="relative overflow-hidden bg-white py-5 pt-10">
      </div>

      <section className="relative overflow-hidden bg-white py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-evenly items-center gap-5 lg:flex-row lg:items-start lg:gap-16">
            {/* Image Section */}
            <div className="relative w-full max-w-md">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-orange-50 to-rose-100 rounded-full opacity-20"></div>
                <img
                  src={AboutUsImage}
                  alt="Educational illustration"
                 // className="relative z-10 shadow-lg"
                />
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
                and learning thrive. With streamlined tools for managing sessions,
                events, and resources, we aim to enhance the overall educational
                experience and help every individual reach their full potential.
              </p>
              <button className="bg-[#F07E12] text-gray-200 mx-auto font-normal py-2 px-4 rounded-md shadow transition-transform duration-200 hover:scale-105 hover:bg-[#F07E12] hover:text-white">
                <span className="transition-transform duration-75 transform">
                  Learn more
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
