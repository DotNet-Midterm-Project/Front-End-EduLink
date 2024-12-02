import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArticles } from "../../Redux/Slices/articlesSlice";
import Card from "../../Components/Card";
import Pagination from "../../Components/Pagination";
import ImageShow from "../../Components/Common/ImageShow";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import NoData from "../../Components/Error/NoData";

const ArticlesList = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state?.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  const getCurrentArticles = (articles, currentPage, itemsPerPage) => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return articles?.slice(startIdx, startIdx + itemsPerPage);
  };

  const currentArticles = getCurrentArticles(
    articles,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div
        className="flex items-center  justify-center text-center my-24"
        style={{ color: "#0B102F" }}
      >
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

      {articles?.length >= 0 && articles[0]?.articleFile ? (
        <>
          {currentPage == 1 && (
            <div className="my-6">
              <ImageShow
                key={articles[0]?.articleID}
                id={articles[0]?.articleID}
                title={articles[0]?.title}
                auther={articles[0]?.volunteerName}
                description={articles[0]?.articleContent}
                date={articles[0]?.publicationDate}
                image={articles[0]?.articleFile}
              />
            </div>
          )}

          <div className="flex flex-wrap justify-start sm:justify-center">
            {currentArticles?.map((article) => (
              <Card
                key={article?.articleID}
                id={article?.articleID}
                title={article?.title}
                auther={article?.volunteerName}
                description={article?.articleContent}
                date={article?.publicationDate}
                image={article?.articleFile}
                location="ArticlesList"
              />
            ))}
          </div>

          <div className="my-6">
            <Pagination
              articles={articles}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default ArticlesList;
