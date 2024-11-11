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
    ]
  
    return (
      <section className="bg-sky-200 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {features.map((feature) => (
              <div key={feature.number} className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-blue-600">
                    {feature.number}
                  </span>
                  <h2 className="border-b-2 border-b-orange-500 pb-2 text-2xl font-bold text-gray-900 border-">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }