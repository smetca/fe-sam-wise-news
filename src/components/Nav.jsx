import React, {Component} from 'react';
import styles from '../styles/Nav.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import onClickOutside from 'react-onclickoutside';
import UserContext from './UserContext';
import NavList from './NavList';

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
    return (
      <UserContext.Consumer>
        {
          ({username, avatar_url}) => (
            <nav className={styles.nav}>
              <button onClick={this.handleNav} aria-label='Nav'><FontAwesomeIcon icon={faBars} color='white'/></button>
              <NavList username={username} avatar_url={avatar_url} isNav={isNav} handleClick={this.handleClick} handleLogout={this.handleLogout}/>
            </nav>
          )
        }
      </UserContext.Consumer>
    );
  }
}
 
export default onClickOutside(Nav);