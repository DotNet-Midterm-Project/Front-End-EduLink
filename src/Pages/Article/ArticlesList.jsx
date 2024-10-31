import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllArticles } from '../../Redux/Slices/articlesSlice';
import Card from '../../Components/Card';
import Pagination from '../../Components/Pagination';
import ImageShow from '../../Components/Common/ImageShow';

const ArticlesList = () => {
    const dispatch = useDispatch();
    const { articles, loading, error } = useSelector((state) => state.articles);
    console.log(articles);

    useEffect(() => {
        dispatch(fetchAllArticles());
    }, [dispatch]);

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <>
            <div className="flex items-center justify-center text-center pt-10 mb-20">
                <div className="relative inline-block">
                    <div className='mb-1 font-bold'>Articles</div>
                    <span className="text-2xl md:text-4xl font-bold py-12">
                        Writings From Our Volunteers
                    </span>
                    <div className='mt-1'>Discover a world of insights and inspiration as you explore our carefully curated content</div>
                </div>
            </div>
            <div className="my-6">
                <ImageShow/>
            </div>
            {articles?.map(article => {
                return (
                    <Card
                        key={article?.articleID}
                        id={article?.articleID}
                        title={article?.title}
                        auther={article?.volunteerName}
                        description={article?.articleContent}
                        date={article?.publicationDate}
                    />
                )
            })}

            <div className="my-6">
                <Pagination articles={articles} />
            </div>
        </>
    );
};

export default ArticlesList;
