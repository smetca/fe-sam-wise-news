import React from 'react';
import { Link } from '@reach/router';
import styles from '../styles/BigNav.module.css';

const BigNav = ({username, avatar_url, changeUser}) => {
  return (
    <ul className={`${styles['navlist-active']} ${styles.navlist}`}>
      {
        username === '' && <li>
          <Link to='/login' className={styles.link}>Login</Link>
        </li>
      }
      <li><Link to='/' className={styles.link}>Home</Link></li>
      <li><Link to='/articles' className={styles.link}>Articles</Link></li>
      {
        username && <>
          <li>
            <Link to={`/user/${username}`} className={styles.link}>{username} <img src={avatar_url} alt="A user avatar"/></Link>
          </li>
          <li>
            <Link to='/' onClick={() => changeUser('')} className={styles.link}>Logout</Link>
          </li>
        </>
      }
    </ul>
  );
}
 
export default BigNav;