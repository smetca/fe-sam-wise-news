import React from 'react';
import { Link } from '@reach/router';
import styles from '../styles/Nav.module.css';
import { useTransition, animated } from 'react-spring';

const NavList = ({username, avatar_url, isNav, handleClick, handleLogout}) => {
  const transition = useTransition(isNav, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: { tension: 300, friction: 20, precision: 0.8}
  })
  return (
    transition.map(({ item, key, props}) => item && <animated.ul style={props} key={key} className={`${styles['navlist-active']} ${styles.navlist}`}>
      {
        username === '' && <li>
          <Link to='/login' onClick={handleClick} className={styles.link}>Login</Link>
        </li>
      }
      <li><Link to='/' onClick={handleClick} className={styles.link}>Home</Link></li>
      <li><Link to='/articles' onClick={handleClick} className={styles.link}>Articles</Link></li>
      {
        username && <>
          <li>
            <Link to={`/user/${username}`} onClick={handleClick} className={styles.link}>{username} <img src={avatar_url} alt="A user avatar"/></Link>
          </li>
          <li>
            <Link to='/' onClick={handleLogout} className={styles.link}>Logout</Link>
          </li>
        </>
      }
    </animated.ul>)
  );
}

export default NavList;