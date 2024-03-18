import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from '../../sign-up/sign-up-form/sign-up-form.module.scss'
import BlogService from '../../service/blog-service';
import { useDispatch } from 'react-redux';
import { updateProfileSuccess, updateProfileFailure } from '../../../store/actions';

const ProfileForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const dispatch = useDispatch();

  const history = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      if (!isValidUrl(data.image)) { // Проверяем, является ли URL корректным
        // Устанавливаем ошибку только для поля image
        setError('image', { type: 'pattern', message: 'Invalid URL' });
        return; // Завершаем выполнение функции, чтобы ошибка не передавалась дальше
      }
      const response = await BlogService.updateUser(data);
      dispatch(updateProfileSuccess(response.user));
      history('/');
    } catch (error) {
      console.error(error);
      dispatch(updateProfileFailure('Profile update failed'));
    }
  };

  const isValidUrl = (url: string) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className={styles['input-frame']}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email',{ required: true })} placeholder='Email' />
        {errors.email && <p>Email is required</p>}
      </div>

      <div className={styles['input-frame']}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" {...register('username',{ required: true, minLength: 3, maxLength: 20 })} placeholder='Username' />
        {errors.username && <p>Username must be between 3 and 20 characters</p>}
      </div>

      <div className={styles['input-frame']}>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password',{ required: true, minLength: 6, maxLength: 40 })} placeholder='New password' />
        {errors.password && <p>Password must be between 6 and 40 characters</p>}
      </div>

      <div className={styles['input-frame']}>
        <label htmlFor="image">URL:</label>
        <input type="text" id="image" {...register('image',{ required: true })} placeholder='Avatar image' />
        {errors.image && <p>URL is required</p>}
        {errors.image && errors.image.type === "pattern" && <p>Invalid URL</p>}
      </div>

      <button type="submit" className={styles['form-button']}>Save Changes</button>
    </form>
  );
};

export default ProfileForm;

