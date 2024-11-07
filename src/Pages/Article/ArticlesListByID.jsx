import { useParams } from "react-router-dom";
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
  console.log(comments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
      dispatch(fetchCommentsByArticle(id)); // استرجاع التعليقات عند تحميل المقالة
    }
  }, [dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ articleID: id, commentText: commentContent }));
    Swal.fire("Success", "Comment added successfully!", "success");
    setCommentContent(""); // إعادة تعيين محتوى التعليق
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
          Swal.fire("Deleted!", "Your comment has been deleted.", "success");
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

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-18 lg:pb-28 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-2xl">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <figure>
              <img
                className="w-full"
                src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
                alt=""
              />
            </figure>
            <p className="lead mt-8">{selectedArticle?.articleContent}</p>

            <section className="not-format mt-12">
              <div className="flex space-x-4">
                <LikeButton
                  articleId={id}
                  like={selectedArticle?.likesCount || 0}
                />
                <button onClick={handleClick}>
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
                          Submit comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
            <div className="mt-24">
              <h2 className="font-bold text-2xl">Comments</h2>
              {comments.length ? (
                comments?.map((comment) => (
                  <div
                    className="max-w-2xl px-4 rounded-lg border-2 my-4"
                    key={comment?.commentID}
                  >
                    <article className="p-6 text-base rounded-lg">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="text-sm text-black dark:text-gray-400">
                            <time>{formatDate(comment?.createdAt)}</time>
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() =>
                              handleDeleteComment(comment.commentID)
                            }
                          >
                            <svg
                              className="h-6 w-6 text-red-500"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {" "}
                              <polyline points="3 6 5 6 21 6" />{" "}
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />{" "}
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      </footer>
                      <p className="text-black dark:text-black">
                        {comment?.commentText}
                      </p>
                    </article>
                  </div>
                ))
              ) : (
                <p>There is no comments.</p>
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

export default ArticlesListByID;
