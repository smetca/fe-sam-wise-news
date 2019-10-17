import React from 'react';
import styles from '../styles/LoggedIn.module.css'
import UserContext from './UserContext';

const LoggedIn = () => {
  return (
    <UserContext.Consumer>
      {
        ({username, avatar_url}) => (
          <section className={styles.login}>
            <em>Logged in as: {username && username.length ? username : 'ananymous'}</em>
            {
              avatar_url && <img src={avatar_url} alt="Your profile"/> 
            }
          </section>
        )
      }
    </UserContext.Consumer>
  );
}
 
export default LoggedIn;