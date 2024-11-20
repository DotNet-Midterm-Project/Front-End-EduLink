import { useState, useCallback } from "react";

export default function OurStats() {
  const [counts, setCounts] = useState({
    volunteers: 0,
    students: 0,
    articles: 0,
    events: 0,
  });

  const targets = [
    { key: "volunteers", count: 200, suffix: "+" },
    { key: "students", count: 600, suffix: "+" },
    { key: "articles", count: 100, suffix: "+" },
    { key: "events", count: 300, suffix: "+" },
  ];

  const animateCountUp = useCallback((target, duration = 1000) => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * target.count);

      setCounts((prev) => ({
        ...prev,
        [target.key]: Math.min(currentCount, target.count),
      }));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, []);

  const handleHover = (target) => {
    if (counts[target.key] === 0) {
      animateCountUp(target);
    }
  };

  return (
    <div className="bg-[#E3F2FD]">
      <div className="pt-6">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center space-y-4 pb-6">
            <h2 className="text-3xl font-bold text-[#0047AB] sm:text-4xl">
              Our Stats
            </h2>
            <div className="relative w-48 sm:w-56">
              <div className="absolute left-1/2 top-1/2 h-4 w-4">
                <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></div>
                <div className="relative inline-flex h-4 w-4 rounded-full bg-orange-500"></div>
              </div>
              <div className="w-full h-0.5 mt-5 bg-orange-500"></div>
            </div>
          </div>

          <p className="mt-4 text-base font-normal text-[#0B102F]">
            Discover the key figures that set us apart and showcase our dedication to excellence.
          </p>
        </div>

        <div className="mt-8">
          <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center p-6 font-bold">
              {targets.map((target) => (
                <div
                  key={target.key}
                  className="p-6 py-14 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105"
                  onMouseEnter={() => handleHover(target)}
                  onFocus={() => handleHover(target)}
                >
                  <dt className="text-xl font-semibold text-[#0B102F]">
                    {target.key === "volunteers"
                      ? "Our Volunteers"
                      : target.key === "students"
                      ? "Our Students"
                      : target.key.charAt(0).toUpperCase() + target.key.slice(1)}
                  </dt>
                  <dd className="mt-3 text-4xl font-extrabold text-[#0B102F]">
                    {counts[target.key].toLocaleString()}
                    {target.suffix}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* White Spacer Section */}
      <div className="bg-white py-10"></div>
    </div>
  );
}
