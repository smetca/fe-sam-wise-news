import React, { Component } from 'react';
import * as api from '../utils/api';
import Loader from '../components/Loader';

class Login extends Component {

  state = {
    users: null,
    selectedUser: 'grumpy19',
    isLoading: true
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.state.selectedUser;
    this.props.changeUser(username);
  }

  handleChange = (event) => {
    event.preventDefault();
    const selectedUser = event.target.value;
    this.setState({selectedUser})
  }

  render() {
    const {isLoading, users} = this.state;
    if(isLoading) return <Loader loading={isLoading} />
    return (
      <section>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <select onChange={this.handleChange} name="username" value={this.state.selectedUser}>
            {
              users && users.map(user => {
                return <option value={user.username} key={user.username}>{user.username}</option>
              })
            }
          </select>
          <input type="submit" value='Login'/>
        </form>
      </section>
    );
  }

  componentDidMount() {
    api.getUsers()
      .then(users => {
        this.setState({users, isLoading: false})
      })
  }
}
 
export default Login;