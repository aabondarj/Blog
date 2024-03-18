import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './sign-up-form.module.scss'
import BlogService from '../../service/blog-service';
import { useDispatch } from 'react-redux';
import { signUpSuccess, signUpFailure } from '../../../store/actions';

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    repeat_password: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (name === 'repeat_password') {
      setPasswordsMatch(value === userData.password);
    } else if (name === 'password') {
      setPasswordsMatch(userData.repeat_password === value);
    }
  };

  const history = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const {username, email, password} = data
      const response = await BlogService.registerUser({ username, email, password });
      if (response.user && response.user.token) {
        localStorage.setItem('accessToken', response.user.token);
        history('/');
      } else {
        if (response.errors.username) {
          setUsernameError('User with this username already exists');
        }
        if (response.errors.email) {
          setEmailError('User with this email already exists');
        }
        // Ошибка: пользователь не был создан или данные ответа неполные
        console.error(response.errors.username);
      }
      dispatch(signUpSuccess(response.user, response.user.token));
    } catch (error: any) {

      if ('response' in error && error.response && 'status' in error.response && error.response && error.response.status === 422) {
        const { errors } = await error.response.json();
        if (errors.username && errors.username.includes('has already been taken')) {
          setUsernameError('User with this username already exists');
        } else if (errors.email && errors.email.includes('has already been taken')) {
          setEmailError('User with this email already exists');
        } else {

          console.error('Unknown error:', error);
        }
      } else {

        console.error(error);

      }
      dispatch(signUpFailure('Registration failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    
    <div className={styles['input-frame']}>
      <label>Username</label>
      <input 
        type="text" 
        {...register('username',{ required: true, minLength: 3, maxLength: 20 })} 
        placeholder='Username'
        value={userData.username}
        onChange={handleChange}
        className={errors.username ? styles['error-input'] : ''}
      />
      {errors.username && <p>Username must be between 3 and 20 characters</p>}
      {usernameError && <p className={styles['error-message']}>{usernameError}</p>}
    </div>

    <div className={styles['input-frame']}>
      <label>Email address</label>
      <input 
        type="email" {...register('email',{ required: true })} 
        placeholder='Email address'
        value={userData.email}
        onChange={handleChange}
        className={errors.email ? styles['error-input'] : ''}
      />
      {errors.email && <p>Email is required</p>}
      {emailError && <p>{emailError}</p>}
    </div>

    <div className={styles['input-frame']}>
      <label>Password</label>
      <input 
        type="password" {...register('password',{ required: true, minLength: 6, maxLength: 40 })} 
        placeholder='Password' 
        value={userData.password}
        onChange={handleChange}
        className={errors.password ? styles['error-input'] : ''}
      />
      {errors.password && <p>Password must be between 6 and 40 characters</p>}
    </div>

    <div className={styles['input-frame']}>
      <label>Repeat Password</label>
      <input
        type="password" {...register('repeat_password',{ required: true })} 
        placeholder='Password' 
        value={userData.repeat_password}
        onChange={handleChange}
        className={errors.repeat_password ? styles['error-input'] : ''}
      />
      {errors.repeat_password && <p>Repeat Password is required</p>}
      {!passwordsMatch && <p>Passwords must match</p>}
      
    </div>

    <hr/>

    <div className={styles['checkbox-frame']}>
      <label style={{cursor: 'pointer'}}>
        <input type="checkbox" {...register('checkbox',{ required: true })} style={{cursor: 'pointer'}} />
        I agree to the processing of my personal information
      </label>
      {errors.checkbox && <p>Checkbox is required</p>}
    </div>

    <button type="submit" className={styles['form-button']}>Create</button>
    <p className={styles['under-button']}>Already have an account? <Link to={`/sign-in`} className={styles['article-title']}>Sign In</Link>.</p>
  </form>
  );
};

export default SignUpForm;