import { fetchArticleById } from '../../Redux/Slices/articlesSlice';

import { useSelector } from "react-redux";

function ArticlesListByID() {
    const { article, loading, error } = useSelector(state => state.articles);
    console.log(article);
    useEffect(() => {
        dispatch(fetchArticleById());
    }, [dispatch]);
    return (
        <>

            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                    class="object-cover w-full h-full" alt="Slide 1" />
                <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-white md:text-2xl dark:text-gray-800">First Slide</span>
            </div>
        </>
    )
}

export default ArticlesListByID;