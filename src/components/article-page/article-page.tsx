import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BlogService from '../service/blog-service';
import Loader from '../loader';
import Error from '../error';
import styles from './article-page.module.scss'
import MdConverting from '../md-converting/md-converting';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleFailure, deleteArticleRequest, deleteArticleSuccess, fetchArticlesRequest, toggleArticleFavoriteFailure, toggleArticleFavoriteRequest, toggleArticleFavoriteSuccess } from '../../store/actions';
import { ArticleP } from '../../store/reducer';

type ArticleParams = {
  slug: string;
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams<ArticleParams>();
  const navigate = useNavigate()
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const [errorLike, setErrorLike] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);

  const dispatch = useDispatch();

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      setErrorLike(true);
    } else {
      dispatch(toggleArticleFavoriteRequest());
      try {
        if (article && article.favorited && slug) {
          console.log(`IF`);
          const removefavoritedState = await BlogService.removeArticleFavorite(slug)
          dispatch(toggleArticleFavoriteSuccess(removefavoritedState.slug, removefavoritedState.favorited, removefavoritedState.favoritesCount));
          setArticle((prevArticle: ArticleP) => ({ ...prevArticle, favorited: removefavoritedState.favorited, favoritesCount: prevArticle.favoritesCount - 1 }));
        } else if (slug) {
          console.log(`ELSE`);
          const togglefavoritedState = await BlogService.toggleArticleFavorite(slug)
          dispatch(toggleArticleFavoriteSuccess(togglefavoritedState.slug, togglefavoritedState.favorited, togglefavoritedState.favoritesCount));
          setArticle((prevArticle: ArticleP) => ({ ...prevArticle, favorited: togglefavoritedState.favorited, favoritesCount: prevArticle.favoritesCount + 1 }));
          console.log('togglefavoritedState', togglefavoritedState);
        }
        
      } catch (error: any) {
        dispatch(toggleArticleFavoriteFailure(error.message));
      }
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (slug) {
          const response = await BlogService.getArticle(slug);
          setArticle(response.article);
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching article');
        setLoading(false);
      }
    };

    fetchArticle();

    return () => {
      // cleanup
    };
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!article) return <Error message="Article not found" />;

  const handleDeleteArticle = async () => {
    if (showConfirmation) {
      try {
        if (slug) {
          dispatch(deleteArticleRequest());
          navigate('/');
          dispatch(deleteArticleSuccess(slug));
          await BlogService.deleteArticle(slug);    
        }
      } catch (error: any) {
        dispatch(deleteArticleFailure(error.message));
      }
    } else {
      setShowConfirmation(true);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const { title, description, body, author, createdAt, tagList, favorited, favoritesCount } = article;

  return (
    <div className={styles['article']}>
      <div className={styles['article-header']}>
        <div className={styles['header-left']}>
          { article && 
          <div>
            <Link to={`/articles/${slug}`} className={styles['article-title']}>
              {title}
            </Link>
            <button onClick={handleToggleFavorite} className={styles[`like-button`]}>
              {favorited ? (
                <img src="https://static.tildacdn.com/tild3761-3962-4237-b761-626338336165/like.svg" alt="Liked" />
              ) : (
                <img src="https://static.tildacdn.com/tild6437-3839-4536-b362-343461636237/dislike.svg" alt="Disliked" />
              )}
            </button>
            <span className={styles['favoritesCount']}>{favoritesCount}</span>
          </div>}
          {errorLike && <p className={styles[`errorLike-text`]}>You need to be <Link to="/sign-in">logged in</Link> to like it.</p>}
          <div className={styles['article-tags']}>
            {tagList.map((tag: string) => {
              return (<p className={styles['article-tag']}>{tag}</p>)
            })}
          </div>
          <p className={styles['article-description']}>{description}</p>
        </div>
        <div className={styles['header-right']}>
          <div className={styles['header-right-info']}>
            <div className={styles['article-info']}>
              <span className={styles['article-author']}>{author.username}</span>
              <span className={styles['article-date']}>{new Date(createdAt).toDateString()}</span>
            </div>
            <div className={styles['article-img']}>
            <img src={author.image} alt={author.username} />
            </div>
          </div>
          {isAuthenticated && <div className={styles['header-right-buttons']}>
            <div>
              <button className={`${styles['button']} ${styles['button-delete']}`} onClick={handleDeleteArticle}>Delete</button>
              <button className={`${styles['button']} ${styles['button-edit']}`}><Link to={`/articles/${slug}/edit`}>Edit</Link></button>
            </div>   
            {showConfirmation && (<div className={styles['popup-delete']}>
              <p>Are you sure to delete this article?</p>
              <div style={{display: 'flex'}}>
                <button onClick={handleCancelDelete} className={`${styles['button']} ${styles['button-no']}`}>No</button>
                <button onClick={handleDeleteArticle} className={`${styles['button']} ${styles['button-yes']}`}>Yes</button>
              </div>
            </div>)}
          </div>}
        </div>
      </div>
      <MdConverting markdown ={body} />
    </div>
  );
};

export default ArticlePage;
