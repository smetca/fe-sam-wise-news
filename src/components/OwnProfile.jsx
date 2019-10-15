import React from 'react';
import styles from '../styles/User.module.css'

const OwnProfile = ({
  myUsername,
  myAvatar,
  myName
}) => {
  return (
    <section className={styles.profile}>
      <h2>{myUsername}</h2>
      <div className={styles.avatar}>
        <img src={myAvatar} alt="Your user avatar"/>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{myName}</span>
      </div>
    </section>
  );
}
 
export default OwnProfile;