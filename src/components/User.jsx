import React from 'react';
import styles from '../styles/User.module.css'

const User = ({username, avatar_url, name}) => {
  if(username === '') return <p>No User Logged In</p>
  return (
    <section className={styles.profile}>
      <h2>Profile</h2>
      <div className={styles.avatar}>
        <img src={avatar_url} alt="Your user avatar"/>
      </div>
      <div className={styles.info}>
        <span className={styles.username}>{username}</span>
        <span className={styles.name}>{name}</span>
      </div>
    </section>
  );
}
 
export default User;