import React from 'react';
import styles from '../styles/User.module.css';

const OtherProfile = ({user}) => {
  return (
    <section className={styles.profile}>
      <h2>{user.username}</h2>
      <div className={styles.avatar}>
        <img src={user.avatar_url} alt={`${user.username}'s avatar`}/>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{user.name}</span>
      </div>
    </section>
  );
}
 
export default OtherProfile;