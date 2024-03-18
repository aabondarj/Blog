import React from 'react';
import CreateArticleForm from '../create-article-form';
import styles from './create-article-page.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import BlogService from '../../service/blog-service';
import { useDispatch, useSelector } from 'react-redux';
import { createArticleFailure, createArticleRequest, createArticleSuccess } from '../../../store/actions';
import { ArticleP } from '../../../store/reducer';

const CreateArticlePage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleCreateArticle = async (data: any) => {
    dispatch(createArticleRequest());
    try {
      const response = await BlogService.createArticle(data);
      console.log(response.article);
      if (response.article && response.article.slug) {
        dispatch(createArticleSuccess(response.article));
        navigate(`/articles/${response.article.slug}`);
      } else {
        console.error('Failed to get article slug from response');
        dispatch(createArticleFailure('Failed to get article slug from response'));
      }
    } catch (error) {
      console.error('Error creating article:', error);
      dispatch(createArticleFailure('Error creating article'));
    }
  };
  return (
    <div className={styles['form-frame-create']}>
      <h2>Create new article</h2>
      <CreateArticleForm onSubmit={handleCreateArticle} isCreate={true}/>
    </div>
  );
};

export default CreateArticlePage;