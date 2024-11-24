import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../../Redux/Slices/articlesSlice";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import LikeButton from "../../Components/Common/LikeButton";
import {
  addComment,
  fetchCommentsByArticle,
  deleteComment,
} from "../../Redux/Slices/commentsSlice";
import { formatDate } from "../../utils/dateUtils";
import Swal from "sweetalert2";

function ArticlesListByID() {
  const { id } = useParams();
  const [isCommentFormVisible, setCommentFormVisible] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { selectedArticle, loading, error } = useSelector(
    (state) => state?.articles
  );

  const { comments } = useSelector((state) => state?.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
      dispatch(fetchCommentsByArticle(id));
    }
  }, [dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ articleID: id, commentText: commentContent }));
    Swal.fire({
      icon: "success",
      title: "Comment added successfully!",
      showConfirmButton: false,
      timer: 2000,
    });
    setCommentContent("");
  };

  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(commentId)).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your comment has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        });
      }
    });
  };

  const handleClick = () => {
    setCommentFormVisible((prev) => !prev);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError />;
  }
  // console.log(selectedArticle);

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-18 lg:pb-28 antialiased mt-12">
        <div className="flex justify-between px-4 mx-auto max-w-screen-2xl">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="relative overflow-hidden bg-white py-5 pt-10"></div>

            <h1 className="font-bold mt-4 text-[#0B102F] text-xl sm:text-2xl md:text-3xl lg:text-4xl flex items-center gap-4">
              {/* سهم مع Tooltip */}
              <div className="relative group flex items-center">
                <Link
                  to="/articles"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 120.14 75.05"
                    className="h-6 w-6 text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out"
                  >
                    <path
                      d="M554.58,574.75a7.6,7.6,0,0,1,1.66,1q7.82,7.74,15.55,15.54A7.49,7.49,0,0,1,567.24,604a6.94,6.94,0,0,1-5.94-2q-15.13-15.09-30.21-30.22a7.21,7.21,0,0,1,.06-10.44q15-15.1,30.09-30.09a7.47,7.47,0,0,1,10.6,10.52c-5.11,5.25-10.34,10.39-15.51,15.57-.45.45-.88.92-1.7,1.78H557q41.67,0,83.35,0a12.09,12.09,0,0,1,3.8.47,7.3,7.3,0,0,1,4.82,7.89A7.38,7.38,0,0,1,642,574c-.76,0-1.52,0-2.29,0H555.17Z"
                      transform="translate(-528.89 -529)"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-40 rounded-lg bg-[#0B102F] bg-opacity-90 px-3 py-2 text-center text-xs font-medium text-white shadow-lg transition-opacity duration-300 group-hover:flex group-hover:opacity-100">
                  Back To Previous Page
                </span>
              </div>

              {/* العنوان */}
              <span className="text-center">{selectedArticle?.title}</span>
            </h1>

            <div className="relative overflow-hidden bg-white py-2 pt-"></div>

            {/* الصورة تحت العنوان */}
            <figure>
              <img
                className="w-full h-80 rounded-2xl"
                src={`${import.meta.env.VITE_URL_BACKEND}/Resources/${
                  selectedArticle?.articleFile
                }`}
                style={{ borderRadius: "0px 20px 20px 20px" }}
                alt={selectedArticle?.title}
              />
            </figure>

            <div className="">
              <p className="lead mt-4 text-justify">
                {selectedArticle?.articleContent}
              </p>
            </div>

            <section className="not-format mt-12">
              <div className="flex space-x-4">
                <LikeButton
                  articleId={id}
                  like={selectedArticle?.likesCount || 0}
                />
                <button onClick={handleClick} className="relative group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>

                  {/* Tooltip */}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden w-24 rounded-md bg-[#0B102F] bg-opacity-80 p-1 text-center text-xs font-medium text-white group-hover:block">
                    Add comment
                  </span>
                </button>
              </div>
            </section>

            {isCommentFormVisible && (
              <div>
                <form className="mt-12" onSubmit={handleCommentSubmit}>
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <div className="h-80 px-7 rounded-[12px] bg-white p-4 shadow-md border w-full">
                      <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black w-full">
                        Add Comment
                      </p>
                      <textarea
                        className="h-40 px-3 text-sm py-1 mt-5 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm"
                        placeholder="Add your comments here"
                        onChange={(e) => setCommentContent(e.target.value)}
                        value={commentContent}
                      />
                      <div className="flex justify-end mt-2">
                        <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="mt-24">
              <h2 className="font-bold text-2xl">Comments</h2>
              {comments?.length ? (
                comments?.map((comment) => (
                  <div
                    className="max-w-2xl px-4 rounded-lg border-2 my-4"
                    key={comment?.commentID}
                  >
                    <article className="p-6 text-base rounded-lg">
                      <footer className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <p className="text-sm text-black dark:text-gray-400">
                            <time>{formatDate(comment?.createdAt)}</time>
                          </p>
                        </div>
                        <div>
                          <button
                            onClick={() =>
                              handleDeleteComment(comment?.commentID)
                            }
                          >
                            <svg
                              className="h-6 w-6 text-red-600 hover:text-red-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      </footer>
                      <h2 className="font-bold">{comment?.userName}</h2>
                      <p className="text-black dark:text-black">
                        {comment?.commentText}
                      </p>
                    </article>
                  </div>
                ))
              ) : (
                <p>There are no comments.</p>
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

export default ArticlesListByID;
