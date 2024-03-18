import React from 'react';
import SignInForm from '../sign-in-form';
import styles from '../../sign-up/sign-up-page/sign-up-page.module.scss'

const SignInPage: React.FC = () => {
  return (
    <div className={styles['form-frame']}>
      <h2>Sign In</h2>
      <SignInForm />
    </div>
  );
};

export default SignInPage;