import React from 'react';
import styles from '../styles/LoggedIn.module.css'

const LoggedIn = ({username, avatar_url, name}) => {
  return (
    <section className={styles.login}>
      <em>Logged in as: {username && username.length ? username : 'ananymous'}</em>
      {
        avatar_url && <img src={avatar_url} alt="Your profile"/> 
      }
    </section>
  );
}
 
export default LoggedIn;