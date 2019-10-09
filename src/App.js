import React, {Component} from 'react';
import Header from './components/Header'
import Nav from './components/Nav';
import './App.css';
import {Router} from '@reach/router'
import Home from './containers/Home'
import Articles from './containers/Articles';
import SingleArticle from './containers/SingleArticle';

class App extends Component {

  state = {
    user: 'tickle122'
  }

  render() {
    return (
      <main className='app'>
        <Header />
        <Nav />
        <Router primary={false} className='viewport'>
          <Home path='/'/>
          <Articles path='/articles'/>
          <SingleArticle path='/articles/:article_id' />
        </Router>
      </main>
    );
  }
}

export default App;
