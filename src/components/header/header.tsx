import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.scss'
import BlogService from "../service/blog-service";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSuccess, fetchUserFailure } from "../../store/actions";

interface RootState {
  auth: {
    userData: any;
    isAuthenticated: boolean;
  } 
}

const Header = () => {

  const userData = useSelector((state: RootState) => state.auth.userData);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const history = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await BlogService.getUserData();
        dispatch(fetchUserSuccess(response.user, response.user.token));

      } catch (error: any) {
        dispatch(fetchUserFailure(error.message));
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
    
  }, [isAuthenticated, dispatch]);

  const handleLogout = async () => {
    try {
      await BlogService.logoutUser();
      dispatch({ type: 'LOGOUT_USER' });
      history('/sign-in');
    } catch (error) {
      console.error(error);
      // Обработка ошибки выхода
    }
  };
  
  return (
    <React.Fragment>
      {/* Код хедера */}
      <div className={styles['app-header']}>
        <p className={styles['logo-title']}><Link to="/">{`Realworld Blog`}</Link></p>
        {isAuthenticated ? (
          <React.Fragment>
            <p className={styles['create-article']}><Link to="/new-article">Create article</Link></p>
            {userData && (
            <React.Fragment>
              <p className={styles['user-name']} onClick={() => history('/profile')}>{userData.username}</p>
              <div className={styles['user-icon']} onClick={() => history('/profile')}>
                <img src={userData.image} alt="Icon" onClick={() => history('/profile')} />
              </div>
            </React.Fragment>
          )}
            <p className={styles['log-out']} onClick={handleLogout}>Log Out</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className={styles['sign-in']}><Link to="/sign-in">Sign In</Link></p>
            <p className={styles['sign-up']}><Link to="/sign-up">Sign Up</Link></p>
          </React.Fragment>
        )}
      </div>
      {/* Конец хедера */}
    </React.Fragment>
  );
}

export default Header;