import LocationIcon from "../../assets/ContactUs/location-pin-svgrepo-com.svg";
import EmailIcon from "../../assets/ContactUs/email-svgrepo-com.svg";
import PhoneIcon from "../../assets/ContactUs/call-192-svgrepo-com.svg";

export default function Component() {
  return (
    <>
      {/* White space above the section */}
      <div className="relative overflow-hidden bg-white py-5 pt-10"></div>

      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">We Are Here For You</h2>
          <p className="text-gray-600">
            Have a project or idea you&apos;d like to bring to life? We&apos;d love to hear from you!
          </p>
        </div>
        {/* Space before cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Location Card */}
          <a
            href="https://maps.app.goo.gl/vvVWyGU3hyd3acMw8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FDF8F7] rounded-lg shadow-lg p-10 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center">
              <img
                src={LocationIcon}
                alt="Location Icon"
                className="h-[80px] w-[100px] mb-6"
                style={{
                  filter:
                    "invert(13%) sepia(86%) saturate(745%) hue-rotate(200deg) brightness(40%) contrast(95%)",
                }}
              />
              <h3 className="font-semibold text-xl mb-4">Our Location</h3>
              <p className="text-gray-600 text-center">Amman, Jordan</p>
            </div>
          </a>

          {/* Call Us Card */}
          <a
            href="tel:+96277912234"
            className="bg-[#FDF8F7] rounded-lg shadow-lg p-10 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center">
              <img
                src={PhoneIcon}
                alt="Phone Icon"
                className="h-[80px] w-[100px] mb-6"
                style={{
                  filter:
                    "invert(13%) sepia(86%) saturate(745%) hue-rotate(200deg) brightness(40%) contrast(95%)",
                }}
              />
              <h3 className="font-semibold text-xl mb-4">Call Us</h3>
              <p className="text-gray-600 text-center">+962 7 9123 1234</p>
            </div>
          </a>

          {/* Email Us Card */}
          <a
            href="mailto:info@edulink.com"
            className="bg-[#FDF8F7] rounded-lg shadow-lg p-10 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center">
              <img
                src={EmailIcon}
                alt="Email Icon"
                className="h-[80px] w-[100px] mb-6"
                style={{
                  filter:
                    "invert(13%) sepia(86%) saturate(745%) hue-rotate(200deg) brightness(40%) contrast(95%)",
                }}
              />
              <h3 className="font-semibold text-xl mb-4">Email Us</h3>
              <p className="text-gray-600 text-center">info@edulink.com</p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
