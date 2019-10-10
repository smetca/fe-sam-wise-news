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
import User from './components/User';

class App extends Component {

  state = {
    username: '',
    avatar_url: '',
    name: ''
  }

  changeUser = (username) => {
    if(username === '') {
      this.setState({username: username, avatar_url: '', name: ''})
    } else {
      api.getUser(username)
        .then(user => {
          console.log(user);
          this.setState({
            username: user.username,
            avatar_url: user.avatar_url,
            name: user.name
          })
        })
    }
  }

  render() {
    return (
      <main className='app'>
        <Header />
        <Nav username={this.state.username} avatar={this.state.avatar_url} changeUser={this.changeUser} />
        <Router primary={false} className='viewport'>
          <Home path='/' />
          <Articles path='/articles' />
          <SingleArticle path='/articles/:article_id' username={this.state.username} />
          <Login path='/login' changeUser={this.changeUser} />
          <User path='/user' {...this.state}/>
        </Router>
      </main>
    );
  }
}

export default App;
