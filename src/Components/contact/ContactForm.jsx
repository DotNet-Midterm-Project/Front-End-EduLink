//import 2736885 from "../../assets/ContactUs/2736885.png";
import IllustrationImage from "../../assets/ContactUs/IllustrationImage.png";

export default function Component() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Form Section */}
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Take a few minutes to fill out our project form, and let us get to know your goals and vision.
            </h2>
            
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FF7733] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#ff8c4d] transition-colors"
              >
                Request Approval
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
    )
  }