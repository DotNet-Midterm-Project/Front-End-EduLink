import { useState, useEffect, useCallback } from 'react';

export default function OurStats() {
  const [counts, setCounts] = useState({
    volunteers: 0,
    students: 0,
    articles: 0,
    events: 0,
  });
  const [completed, setCompleted] = useState({
    volunteers: false,
    students: false,
    articles: false,
    events: false,
  });

  const targets = [
    { key: 'volunteers', count: 150, suffix: '+' },
    { key: 'students', count: 150, suffix: '+' },
    { key: 'articles', count: 150, suffix: '+' },
    { key: 'events', count: 150, suffix: '+' },
  ];

  const animateCountUp = useCallback((target, duration) => {
    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * target.count);

      setCounts((prev) => ({
        ...prev,
        [target.key]: Math.min(currentCount, target.count),
      }));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCompleted((prev) => ({
          ...prev,
          [target.key]: true,
        }));
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleHover = useCallback(
    (target) => {
      if (!completed[target.key]) {
        animateCountUp(target, 1000); // 1 second duration
      }
    },
    [animateCountUp, completed]
  );

  useEffect(() => {
    // Reset counts and completed status when component unmounts
    return () => {
      setCounts({ volunteers: 0, students: 0, articles: 0, events: 0 });
      setCompleted({ volunteers: false, students: false, articles: false, events: false });
    };
  }, []);

  return (
    <div className=" bg-[#E3F2FD]">
      <div className="pt-3 sm:pt-3">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-2 pb-5 ">
          <h2 className="text-3xl font-bold tracking-tight text-[#0047AB] sm:text-4xl">
            Our State
          </h2>
          <div className="relative w-48 sm:w-56">
            <div className="absolute left-1/2 top-1/2 h-4 w-4">
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></div>
              <div className="relative inline-flex h-4 w-4 rounded-full bg-orange-500"></div>
            </div>
            <div className=" w-full h-0.5  mt-5 bg-orange-500"></div>
          </div>
        </div>
          
          <p className="mt-3 text-lg text-gray-700">
            Discover the key figures that set us apart and showcase our dedication to excellence.
          </p>
        </div>
        
        <div className=" mt-5">
          <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className=" rounded-lg  grid gap-6 sm:grid-cols-4 text-center p-6 font-bold">
              {targets.map((target) => (
                <div
                  key={target.key}
                  className="p-3 py-16 bg-white rounded-2xl shadow-md "
                  onMouseEnter={() => handleHover(target)}
                  onFocus={() => handleHover(target)}
                >
                  <dt className="text-3xl font-bold  text-[#0047AB]">
                    {target.key === 'volunteers'
                      ? 'Our Volunteers'
                      : target.key === 'students'
                      ? 'Our Students'
                      : target.key.charAt(0).toUpperCase() + target.key.slice(1)}
                  </dt>
                  <dd className="mt-2 text-4xl font-bold text-[#0047AB]">
                    {counts[target.key].toLocaleString()}{target.suffix}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
