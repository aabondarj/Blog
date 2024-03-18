import React, {useState} from 'react';
import styles from './article.module.scss'
import { Link } from 'react-router-dom';
import BlogService from '../service/blog-service';
import { useDispatch, useSelector } from 'react-redux';
import { removeArticleFavoriteSuccess, toggleArticleFavoriteFailure, toggleArticleFavoriteRequest, toggleArticleFavoriteSuccess } from '../../store/actions';
import { ArticleProps } from '../../store/reducer';

const Article: React.FC<ArticleProps> = ({ article }) => {
  const dispatch = useDispatch();
  const { slug, title, description, author, createdAt, tagList, favorited, favoritesCount } = article;
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const [errorLike, setErrorLike] = useState(false)

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      setErrorLike(true);
    } else {
      // dispatch(toggleArticleFavoriteRequest());
      try {
        if (favorited) {
          const removefavoritedState = await BlogService.removeArticleFavorite(slug)
          console.log('removefavoritedState', removefavoritedState);
          dispatch(removeArticleFavoriteSuccess(removefavoritedState.slug, removefavoritedState.favorited, removefavoritedState.favoritesCount));
        } else {
          const togglefavoritedState = await BlogService.toggleArticleFavorite(slug)
          dispatch(toggleArticleFavoriteSuccess(togglefavoritedState.slug, togglefavoritedState.favorited, togglefavoritedState.favoritesCount));
          console.log('togglefavoritedState', togglefavoritedState);
        }
        
      } catch (error: any) {
        dispatch(toggleArticleFavoriteFailure(error.message));
      }
    }
  };


  return (
    <div className={styles['article']}>
      <div className={styles['article-header']}>
        <div className={styles['header-left']}>
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
          </div>
          {errorLike && <p className={styles[`errorLike-text`]}>You need to be <Link to="/sign-in">logged in</Link> to like it.</p>}
          <div className={styles['article-tags']}>
            {tagList.map((tag) => {
              return (<p className={styles['article-tag']}>{tag}</p>)
            })}
          </div>
          <p className={styles['article-description']}>{description}</p>
        </div>
        <div className={styles['header-right']}>
          <div className={styles['article-info']}>
            <span className={styles['article-author']}>{author.username}</span>
            <span className={styles['article-date']}>{new Date(createdAt).toDateString()}</span>
          </div>
          <div className={styles['article-img']}>
          <img src={author.image} alt={author.username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
