import { useState, useEffect } from "react";
import IllustrationImage from "../../assets/ContactUs/IllustrationImage.png";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Fadi Al-Najar",
          from_email: form.email,
          to_email: "fadi.alnajar19@gmail.com",
          phone: form.phone,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you. I will get back to you as soon as possible.",
            confirmButtonText: "OK",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ahh, something went wrong. Please try again.",
            confirmButtonText: "OK",
          });
        }
      );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Form Section */}
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Take a few minutes to fill out our project form, and let us get to
            know your goals and vision.
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#FF7733] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#ff8c4d] transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Request Approval"}
            </button>
          </form>
        </div>

        {/* Illustration Section */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-[#E6F4F9] opacity-50 z-0">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-repeat opacity-20" />
          </div>
          <div className="relative z-10">
            <img
              src={IllustrationImage}
              alt="Customer service illustration"
              className="w-full h-auto"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 z-20">
            <div className="absolute top-10 left-10 text-purple-300 opacity-30">
              <span className="text-4xl">?</span>
            </div>
            <div className="absolute top-20 right-20 text-purple-300 opacity-30">
              <span className="text-4xl">✉</span>
            </div>
            <div className="absolute bottom-20 left-20 text-purple-300 opacity-30">
              <span className="text-4xl">📞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
