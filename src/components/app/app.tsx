import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../article-list';
import ArticlePage from '../article-page';
import SignInPage from '../sign-in/sign-in-page';
import SignUpPage from '../sign-up/sign-up-page';
import ProfilePage from '../profile/profile-page';
import Header from '../header';
import CreateArticlePage from '../create-article/create-article-page';
import EditArticlePage from '../edit-article';
import PrivateRoute from '../private/private-route';


const App: React.FC = () => {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <CreateArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <PrivateRoute>
              <EditArticlePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
