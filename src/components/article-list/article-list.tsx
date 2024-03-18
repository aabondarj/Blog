import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogService from '../service/blog-service';
import Loader from '../loader';
import Error from '../error';
import Article from '../article/article';
import styles from './article-list.module.scss'
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesRequest, fetchArticlesSuccess } from '../../store/actions';
import { ArticleP } from '../../store/reducer';

const ArticleList: React.FC = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchArticlesRequest());
      try {
        const response = await BlogService.getArticles(limit, offset);
        dispatch(fetchArticlesSuccess(response.articles));
        setTotalPages(Math.ceil(response.articlesCount / limit))
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, [currentPage, dispatch, offset]);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setLoading(true);
  };

  const elements = articles ? 
    articles.map((article: ArticleP) => {
      return (
        <li 
          key={article.slug}
          className={styles['aritcle-item']}>
          <Article  article={article} />
        </li>
      )
    }) : null

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  console.log(articles);
  
  return (
    <React.Fragment>
    {(loading && !error) ? <Loader /> : ''}
    {error ? <Error message={error} /> : ''}
    {
      (!loading && !error) && 
      <ul className={styles['article-list']}>
        {elements}
      </ul>
    }
    <Pagination
      current={currentPage}
      total={totalPages}
      onChange={handlePageChange}
      pageSize={10}
      style={{marginRight: "auto", marginLeft: "auto", marginBottom: "20px", width: "fit-content"}}
    />
    </React.Fragment>
  );
};

export default ArticleList;