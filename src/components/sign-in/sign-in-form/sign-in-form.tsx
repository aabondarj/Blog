import React, { useState } from 'react';
import { useForm  } from 'react-hook-form';
import styles from '../../sign-up/sign-up-form/sign-up-form.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import BlogService from '../../service/blog-service';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../../../store/actions';

const SignInForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [signInError, setSignInError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const response = await BlogService.loginUser(data);
      localStorage.setItem('accessToken', response.user.token);
      dispatch(signInSuccess(response.user, response.user.token));
      history('/');
    } catch (error: any) {
      console.log('error', error);
      if (error.message === 'Failed to login user') {
        setSignInError('Invalid email or password');
      } else {
        console.error(error);
        dispatch(signInFailure('Authentication failed'));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['input-frame']}>
        <label>Email address</label>
        <input
        type="email" {...register('email',{ required: true })}
        placeholder='Email address'
        className={(errors.email || signInError) ? styles['error-input'] : ''}/>
        {errors.email && <p>Email is required</p>}
      </div>
      
      <div className={styles['input-frame']}>
        <label>Password</label>
        <input
        type="password" {...register('password',{ required: true })}
        placeholder='Password address'
        className={(errors.password || signInError) ? styles['error-input'] : ''}/>
        {errors.password && <p>Password is required</p>}
      </div>

      {signInError && <p className={styles['error-message']}>{signInError}</p>}
      
      <button type="submit" className={styles['form-button']}>Sign In</button>
      <p className={styles['under-button']}>Don’t have an account? <Link to={`/sign-up`} className={styles['article-title']}>Sign Up</Link>.</p>
    </form>
  );
};

export default SignInForm;