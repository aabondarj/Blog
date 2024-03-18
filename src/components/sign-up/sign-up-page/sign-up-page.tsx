import React from 'react';
import SignUpForm from '../sign-up-form';
import styles from './sign-up-page.module.scss'

const SignUpPage: React.FC = () => {
  return (
    <div className={styles['form-frame']}>
      <h2>Create new account</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;