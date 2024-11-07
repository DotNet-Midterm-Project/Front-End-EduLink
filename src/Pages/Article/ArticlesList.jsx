import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArticles } from "../../Redux/Slices/articlesSlice";
import Card from "../../Components/Card";
import Pagination from "../../Components/Pagination";
import ImageShow from "../../Components/Common/ImageShow";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";

const ArticlesList = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state?.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 
  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIdx, startIdx + itemsPerPage);
console.log(articles);

  return (
    <>
      <div className="flex items-center justify-center text-center pt-10 mb-20">
        <div className="relative inline-block">
          <div className="mb-1 font-bold">Articles</div>
          <span className="text-2xl md:text-4xl font-bold py-12">
            Writings From Our Volunteers
          </span>
          <div className="mt-1">
            Discover a world of insights and inspiration as you explore our
            carefully curated content
          </div>
        </div>
      </div>
      <div className="my-6 ">
        <ImageShow
          key={articles[1]?.articleID}
          id={articles[1]?.articleID}
          title={articles[1]?.title}
          auther={articles[1]?.volunteerName}
          description={articles[1]?.articleContent}
          date={articles[1]?.publicationDate}
          image={articles[1]?.articleFile}
        />
      </div>

      <div className="flex flex-wrap justify-start sm:justify-center">
        {currentArticles?.map((article) => {
          return (
            <Card
              key={article?.articleID}
              id={article?.articleID}
              title={article?.title}
              auther={article?.volunteerName}
              description={article?.articleContent}
              date={article?.publicationDate}
              image={article?.articleFile}
            />
          );
        })}
      </div>

      <div className="my-6">
        <Pagination articles={articles} onPageChange={setCurrentPage}/>
      </div>
    </>
  );
};

export default ArticlesList;
