// actions.tsx

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

// Action types for sign-in component
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

// Action types for sign-up component
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// Action types for profile component
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

// Action types for header component
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const TOGGLE_ARTICLE_FAVORITE_REQUEST = 'TOGGLE_ARTICLE_FAVORITE_REQUEST';
export const TOGGLE_ARTICLE_FAVORITE_SUCCESS = 'TOGGLE_ARTICLE_FAVORITE_SUCCESS';
export const TOGGLE_ARTICLE_FAVORITE_FAILURE = 'TOGGLE_ARTICLE_FAVORITE_FAILURE';

export const REMOVE_ARTICLE_FAVORITE_REQUEST = 'REMOVE_ARTICLE_FAVORITE_REQUEST';
export const REMOVE_ARTICLE_FAVORITE_SUCCESS = 'REMOVE_ARTICLE_FAVORITE_SUCCESS';
export const REMOVE_ARTICLE_FAVORITE_FAILURE = 'REMOVE_ARTICLE_FAVORITE_FAILURE';

export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const UPDATE_ARTICLE_REQUEST = 'UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';

export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';


export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});

export const fetchArticlesSuccess = (articles: any[]) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles,
});

export const fetchArticlesFailure = (error: string) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});


// Action creators for sign-in component
export const signInSuccess = (userData: any, token: string) => ({
    type: SIGN_IN_SUCCESS,
    payload: { userData, token },
  });
  
  export const signInFailure = (error: string) => ({
    type: SIGN_IN_FAILURE,
    payload: error,
  });
  
  // Action creators for sign-up component
  export const signUpSuccess = (userData: any, token: string) => ({
    type: SIGN_UP_SUCCESS,
    payload: { userData, token },
  });
  
  export const signUpFailure = (error: string) => ({
    type: SIGN_UP_FAILURE,
    payload: error,
  });
  
  // Action creators for profile component
  export const updateProfileSuccess = (userData: any) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: userData,
  });
  
  export const updateProfileFailure = (error: string) => ({
    type: UPDATE_PROFILE_FAILURE,
    payload: error,
  });
  
  // Action creators for header component
  export const fetchUserSuccess = (userData: any, token: string) => ({
    type: FETCH_USER_SUCCESS,
    payload: { userData, token },
  });
  
  export const fetchUserFailure = (error: string) => ({
    type: FETCH_USER_FAILURE,
    payload: error,
  });

  export const logoutUser = () => ({
    type: LOGOUT_USER,
  });

  export const toggleArticleFavoriteRequest = () => ({
    type: TOGGLE_ARTICLE_FAVORITE_REQUEST,
  });
  
  export const toggleArticleFavoriteSuccess = (slug: string, favorited: boolean, favoritesCount: number) => ({
    type: TOGGLE_ARTICLE_FAVORITE_SUCCESS,
    payload: {slug, favorited, favoritesCount},
  });
  
  export const toggleArticleFavoriteFailure = (error: string) => ({
    type: TOGGLE_ARTICLE_FAVORITE_FAILURE,
    payload: error,
  });
  
  // Action creators for removing article favorite
  export const removeArticleFavoriteRequest = () => ({
    type: REMOVE_ARTICLE_FAVORITE_REQUEST,
  });
  
  export const removeArticleFavoriteSuccess = (slug: string, favorited: boolean, favoritesCount: number) => ({
    type: REMOVE_ARTICLE_FAVORITE_SUCCESS,
    payload: {slug, favorited, favoritesCount},
  });
  
  export const removeArticleFavoriteFailure = (error: string) => ({
    type: REMOVE_ARTICLE_FAVORITE_FAILURE,
    payload: error,
  });

  export const createArticleRequest = () => ({
    type: CREATE_ARTICLE_REQUEST,
  });

  export const createArticleSuccess = (article: any) => ({
    type: CREATE_ARTICLE_SUCCESS,
    payload: article,
  });

  export const createArticleFailure = (error: string) => ({
    type: CREATE_ARTICLE_FAILURE,
    payload: error,
  });

  export const updateArticleRequest = () => ({
    type: UPDATE_ARTICLE_REQUEST,
  });

  export const updateArticleSuccess = (article: any) => ({
    type: UPDATE_ARTICLE_SUCCESS,
    payload: article,
  });

  export const updateArticleFailure = (error: string) => ({
    type: UPDATE_ARTICLE_FAILURE,
    payload: error,
  });

  export const deleteArticleRequest = () => ({
    type: DELETE_ARTICLE_REQUEST,
  });

  export const deleteArticleSuccess = (slug: string) => ({
    type: DELETE_ARTICLE_SUCCESS,
    payload: slug,
  });

  export const deleteArticleFailure = (error: string) => ({
    type: DELETE_ARTICLE_FAILURE,
    payload: error,
  });
