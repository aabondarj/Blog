import {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    LOGOUT_USER,
    TOGGLE_ARTICLE_FAVORITE_REQUEST,
    TOGGLE_ARTICLE_FAVORITE_SUCCESS,
    TOGGLE_ARTICLE_FAVORITE_FAILURE,
    REMOVE_ARTICLE_FAVORITE_REQUEST,
    REMOVE_ARTICLE_FAVORITE_SUCCESS,
    REMOVE_ARTICLE_FAVORITE_FAILURE,
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAILURE,
    UPDATE_ARTICLE_REQUEST,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_FAILURE,
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,
  } from './actions';

  export interface ArticleP {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  }

  export interface ArticleProps {
    article: ArticleP;
  }
  
  // Начальное состояние
  const initialState = {
    articles: [],
    userData: null,
    error: null,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    togglingFavorite: false,
    removingFavorite: false, 
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_ARTICLES_REQUEST:
        return {
          ...state,
          loading: true,
          error: '',
        };
      case FETCH_ARTICLES_SUCCESS:
        return {
          ...state,
          articles: action.payload,
          error: '',
        };
      case FETCH_ARTICLES_FAILURE:
        return {
          ...state,
          articles: [],
          loading: false,
          error: action.payload,
        };
      case SIGN_IN_SUCCESS:
      case SIGN_UP_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
      case FETCH_USER_SUCCESS:
        localStorage.setItem('accessToken', action.payload.token);
        return {
          ...state,
          userData: action.payload.userData,
          error: null,
          isAuthenticated: true,
        };
      case SIGN_IN_FAILURE:
      case SIGN_UP_FAILURE:
      case UPDATE_PROFILE_FAILURE:
      case FETCH_USER_FAILURE:
        return {
          ...state,
          userData: null,
          error: action.payload,
          isAuthenticated: false,
        };
        case LOGOUT_USER:
        localStorage.removeItem('accessToken'); // Удаление токена при выходе из системы
        return {
        ...state,
        userData: null,
        isAuthenticated: false,
      };
      case TOGGLE_ARTICLE_FAVORITE_REQUEST:
      return {
        ...state,
      };
      case TOGGLE_ARTICLE_FAVORITE_SUCCESS:
        const updatedArticlesLike = state.articles.map((article: any) => {
          if (article.slug === action.payload.slug) {
            return {
              ...article,
              favorited: action.payload.favorited,
              favoritesCount: article.favoritesCount + 1,
            };
          }
          return article;
        })
        return {
          ...state,
          articles: updatedArticlesLike,
        };
      case TOGGLE_ARTICLE_FAVORITE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      // Обработка запроса на удаление лайка
      case REMOVE_ARTICLE_FAVORITE_REQUEST:
        return {
          ...state,
        };
      case REMOVE_ARTICLE_FAVORITE_SUCCESS:
        const updatedArticlesDislike = state.articles.map((article: any) => {
          if (article.slug === action.payload.slug) {
            return {
              ...article,
              favorited: action.payload.favorited,
              favoritesCount: article.favoritesCount - 1,
            };
          }
          return article;
        })
        return {
          ...state,
          articles: updatedArticlesDislike,
        };
      case REMOVE_ARTICLE_FAVORITE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
        case CREATE_ARTICLE_REQUEST:
    case UPDATE_ARTICLE_REQUEST:
    case DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        articles: [action.payload, ...state.articles],
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        articles: state.articles.map((article: ArticleP) =>
          article.slug === action.payload.slug ? action.payload : article
        ),
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        articles: state.articles.filter((article: ArticleP) => article.slug !== action.payload.slug),
      };
    case CREATE_ARTICLE_FAILURE:
    case UPDATE_ARTICLE_FAILURE:
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default authReducer;
  