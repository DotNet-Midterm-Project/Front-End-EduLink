export default function OurProcess() {
  const features = [
    {
      number: "01",
      title: "Connect with Experts",
      description:
        "Access a network of skilled volunteers ready to offer academic assistance. Browse through available sessions and find the right support based on your needs.",
    },
    {
      number: "02",
      title: "Book and Manage Sessions",
      description:
        "Easily schedule one-on-one sessions or sign up for academic events. Volunteers and students can manage bookings, cancellations, and event participation with just a few clicks.",
    },
    {
      number: "03",
      title: "Track Progress and Feedback",
      description:
        "Stay informed with real-time notifications for upcoming sessions, events, and receive valuable feedback through volunteer evaluations to ensure continuous improvement.",
    },
  ];

  return (
    <section className="bg-sky-200 py-24">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-blue-800 md:text-5xl">
            Our Process
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Discover how we make collaboration and learning seamless and efficient.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="p-6 transition-transform duration-200 bg-white rounded-lg shadow hover:scale-105"
            >
              {/* Step Number */}
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-white bg-[#F28E33] rounded-full">
                  {feature.number}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              </div>

              {/* Step Description */}
              <p className="mt-4 text-justify text-[#0B102F]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
