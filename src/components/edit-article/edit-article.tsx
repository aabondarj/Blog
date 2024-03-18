import React, { useEffect, useState } from 'react';
import CreateArticleForm from '../create-article/create-article-form';
import styles from '../create-article/create-article-page/create-article-page.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import BlogService from '../service/blog-service';
import { useDispatch, useSelector } from 'react-redux';
import { updateArticleFailure, updateArticleRequest, updateArticleSuccess } from '../../store/actions';
import { ArticleP } from '../../store/reducer';

const EditArticlePage: React.FC = () => {

  const {slug} = useParams() 
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [article, setArticle] = useState()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (slug) {
          const response = await BlogService.getArticle(slug);
          setArticle(response.article);
        }
      } catch (error) {
        console.error(error)
      }
    };

    fetchArticle();

    return () => {
      // cleanup
    };
  }, [slug]);

  const handleCreateArticle = async (data: any) => {
    console.log(`data ${data}`);
    dispatch(updateArticleRequest());
    if (slug) {
      try {
        const response = await BlogService.updateArticle(data, slug);
        if (response.article && response.article.slug) {
          dispatch(updateArticleSuccess(response.article));
          navigate(`/articles/${slug}`);
        } else {
          console.error('Failed to get article slug from response');
          dispatch(updateArticleFailure('Failed to get article slug from response'));
        }
      } catch (error) {
        console.error('Error creating article:', error);
        dispatch(updateArticleFailure('Error creating article'));
      }
    }
  };
  return (
    <div className={styles['form-frame-create']}>
      <h2>Edit article</h2>
      <CreateArticleForm onSubmit={handleCreateArticle}  dV={article} isCreate={false}/>
    </div>
  );
};

export default EditArticlePage;

