import { useState } from "react";
import Latest from "../../assets/Home/Latest.png"


export default function LatestArticles()  {
  const articles = [
    {
      text: "Introduction for C#: versatile, object-oriented programming language used for building diverse applications versatile, object-oriented...."
    },
    {
      text: "Introduction for C#: versatile, object-oriented programming language used for building diverse applications versatile, object-oriented...."
    },
    {
      text: "Introduction for C#: versatile, object-oriented programming language used for building diverse applications versatile, object-oriented...."
    }
  ];
  
  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 text-center ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-2 pb-5 ">
          <h2 className="text-3xl font-bold tracking-tight text-[#0047AB] sm:text-4xl">
            Latest Articles
          </h2>
          <div className="relative w-48 sm:w-56">
            <div className="absolute left-1/2 top-1/2 h-4 w-4">
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></div>
              <div className="relative inline-flex h-4 w-4 rounded-full bg-orange-500"></div>
            </div>
            <div className=" w-full h-0.5  mt-5 bg-orange-500"></div>
          </div>
        </div>
        <p className=" mb-8 font-bold">
          Stay updated with the latest news, tips, and insights from our experts in the field.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ArticleCard = ({ article }) => {
  const [bgColor, setBgColor] = useState('bg-gray-400');

  const handleMouseEnter = () => {
    setBgColor('bg-white'); 
    const timer = setTimeout(() => {
      setBgColor('bg-blue-500'); 
    }, 250);
    return () => clearTimeout(timer); 
  };

  const handleMouseLeave = () => {
    setBgColor('bg-gray-400'); 
  };

  return (
    <div
      className={`relative w-full h-80 overflow-hidden rounded-lg shadow-lg cursor-pointer group transition-colors duration-300 ease-in-out ${bgColor}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={Latest}
        alt="Article"
        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 ${bgColor} bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
      >
        <p className="text-white font-bold  px-4 text-2xl ">
          {article.text}
        </p>
      </div>
    </div>
  );
};


// ArticleCard.propTypes = {
// article: PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     author: PropTypes.string,
//     date: PropTypes.instanceOf(Date), // example for a date field
//   }).isRequired,
// };


