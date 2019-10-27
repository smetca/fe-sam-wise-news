import React, { Component } from 'react';
import Header from './components/Header'
import Nav from './components/Nav';
import './App.css';
import { Router } from '@reach/router'
import Home from './containers/Home'
import Articles from './containers/Articles';
import SingleArticle from './containers/SingleArticle';
import Login from './containers/Login';
import * as api from './utils/api'
import User from './containers/User';
import CreateArticles from './containers/CreateArticles';
import EndpointError from './components/EndpointError';
import LoggedIn from './components/LoggedIn';
import UserContext from './components/UserContext';

class App extends Component {

  state = {
    username: '',
    avatar_url: '',
    name: ''
  }

  changeUser = (username) => {
    if(username === '') {
      this.setState({username: '', avatar_url: '', name: ''})
    } else {
      api.getUser(username)
        .then(user => {
          localStorage.setItem('username', user.username);
          localStorage.setItem('avatar_url', user.avatar_url);
          localStorage.setItem('name', user.name);
          this.setState({
            username: user.username,
            avatar_url: user.avatar_url,
            name: user.name
          })
        })
    }
  }

  render() {
    const {username, avatar_url, name} = this.state;
    return (
      <main className='app'>
        <Header />
        <UserContext.Provider value={this.state}>
          <Nav changeUser={this.changeUser} />
          <LoggedIn />
          <Router primary={false} className='viewport'>
            <Home path='/' />
            <Articles path='/articles/*' />
            <SingleArticle path='/articles/:article_id' />
            <Login path='/login' changeUser={this.changeUser} />
            <User path='/user/*' myUsername={username} myAvatar={avatar_url} myName={name}/>
            <CreateArticles path='/article/create'/>
            <EndpointError default />
          </Router>
        </UserContext.Provider>
      </main>
    );
  }

  componentDidMount() {
    if(localStorage.getItem('username')) {
      this.setState({
        username: localStorage.getItem('username'),
        avatar_url: localStorage.getItem('avatar_url'),
        name: localStorage.getItem('name')});
    }
  }
}

export default App;
