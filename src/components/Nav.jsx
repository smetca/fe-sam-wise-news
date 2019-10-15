import React, {Component} from 'react';
import styles from '../styles/Nav.module.css'
import {Link} from '@reach/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import onClickOutside from 'react-onclickoutside';

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

  handleClickOutside = (event) => {
    this.setState({isNav: false})
  }

  handleClick = (event) => {
    this.setState({isNav: false})
  }

  handleLogout = (event) => {
    const {changeUser} = this.props;
    const username = ''
    this.setState({isNav: false})
    changeUser(username);
  }

  render() {
    const {isNav} = this.state;
    const {username} = this.props;
    return (
      <nav className={styles.nav}>
        <button onClick={this.handleNav}><FontAwesomeIcon icon={faBars} color='white'/></button>
        <ul className={isNav ? `${styles['navlist-active']} ${styles.navlist}` : styles.navlist}>
          {
            username === '' && <li>
              <Link to='/login' onClick={this.handleClick} className={styles.link}>Login</Link>
            </li>
          }
          <li><Link to='/' onClick={this.handleClick} className={styles.link}>Home</Link></li>
          <li><Link to='/articles' onClick={this.handleClick} className={styles.link}>Articles</Link></li>
          {
            username && <>
              <li>
                <Link to={`/user/${username}`} onClick={this.handleClick} className={styles.link}>{this.props.username} <img src={this.props.avatar} alt="A user avatar"/></Link>
              </li>
              <li>
                <Link to='/' onClick={this.handleLogout} className={styles.link}>Logout</Link>
              </li>
            </>
          }
        </ul>
      </nav>
    );
  }
}
 
export default onClickOutside(Nav);