import { useState, useEffect } from "react";
import Latest from "../../assets/Home/Latest.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArticles } from "../../Redux/Slices/articlesSlice";

export default function LatestArticles() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state?.articles);

  const latestArticles = articles
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a?.createdAt))
    .slice(0, 3);

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col items-center space-y-4 pb-8">
          <h2 className="text-4xl font-bold text-[#0047AB] sm:text-5xl">
            Latest Articles
          </h2>
          <div className="relative w-48 sm:w-56">
            <div className="absolute left-1/2 top-[95%] h-5 w-5 -translate-y-1/2 transform">
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></div>
              <div className="relative inline-flex h-5 w-5 rounded-full bg-orange-500"></div>
            </div>
            <div className="w-full h-0.5 mt-7 bg-orange-500"></div>
          </div>
        </header>
        <p className="mb-10 text-lg font-normal text-[#0B102F]">
          Stay updated with the latest news, tips, and insights from our experts in the field.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {latestArticles?.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ArticleCard = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-80 overflow-hidden rounded-lg rounded-tl-none shadow-lg transition-transform transform group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${article?.articleFile}`}
        alt="Article"
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
      />
      <div
        className={`absolute bottom-0 left-0 w-full text-white px-4 py-6 transition-transform ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h3 className="text-xl font-bold">{article?.title}</h3>
        <p className="text-sm mt-2">
          Published: {new Date(article?.createdAt).toLocaleDateString()}
        </p>
        
      </div>
      <div className="bg-white py-10"></div>
    </div>
    
  );
};
