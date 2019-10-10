import React, {Component} from 'react';
import styles from '../styles/Nav.module.css'
import {Link} from '@reach/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

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

  handleLogout = (event) => {
    event.preventDefault();
    const username = ''
    this.props.changeUser(username);
  }

  render() {
    const {isNav} = this.state;
    return (
      <nav className={styles.nav}>
        <button onClick={this.handleNav}><FontAwesomeIcon icon={faBars} color='white'/></button>
        <ul className={isNav ? `${styles['navlist-active']} ${styles.navlist}` : styles.navlist}>
          {
            this.props.username === '' && <li>
              <Link to='/login' className={styles.link}>Login</Link>
            </li>
          }
          <li><Link to='/' className={styles.link}>Home</Link></li>
          <li><Link to='/articles' className={styles.link}>Articles</Link></li>
          {
            this.props.username && <>
              <li>
                <Link to='/user' className={styles.link}>{this.props.username} <img src={this.props.avatar} alt="A user avatar"/></Link>
              </li>
              <li>
                  <button onClick={this.handleLogout} className={styles.link}>Logout</button>
                </li>
            </>
          }
        </ul>
      </nav>
    );
  }
}
 
export default Nav;