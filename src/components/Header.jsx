import React from 'react';
import styles from '../styles/Header.module.css'
import {Link} from '@reach/router';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <h1>Sam Wise News</h1>
      </Link>
    </header>
  );
}
 
export default Header;