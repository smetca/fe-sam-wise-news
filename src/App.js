import React from 'react';
import Header from './components/Header'
import Nav from './components/Nav';
import './App.css';
import {Router} from '@reach/router'
import Home from './containers/Home'
import Articles from './containers/Articles';

function App() {
  return (
    <main className='app'>
      <Header />
      <Nav />
      <Router primary={false} className='viewport'>
        <Home path='/'/>
        <Articles path='/articles'/>
      </Router>
      {/* <Viewport /> */}
    </main>
  );
}

export default App;
