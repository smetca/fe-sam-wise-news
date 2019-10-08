import React, {Component} from 'react';
import styles from '../styles/Nav.module.css'
import {Link} from '@reach/router';

class Nav extends Component {
  
  state = {
    isNav: false
  }

  handleNav = (event) => {
    event.preventDefault();
    this.setState((currentState) => {
      const {isNav} = currentState;
      return {isNav: !isNav}
    })
  }

  render() {
    const {isNav} = this.state;
    return (
      <nav className={styles.nav}>
        <button onClick={this.handleNav}>NAV</button>
        <ul className={isNav ? `${styles['navlist-active']} ${styles.navlist}` : styles.navlist}>
          <Link to='/'><li>Home</li></Link>
          <Link to='/articles'><li>Articles</li></Link>
        </ul>
      </nav>
    );
  }
}
 
export default Nav;