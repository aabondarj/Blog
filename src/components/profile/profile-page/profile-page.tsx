import React from 'react';
import ProfileForm from '../profile-form';
import styles from '../../sign-up/sign-up-page/sign-up-page.module.scss'

const ProfilePage: React.FC = () => {
  return (
    <div className={styles['form-frame']}>
      <h2>Edit Profile</h2>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;