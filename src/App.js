import React from 'react';
import Header from './components/Header'
import Nav from './components/Nav';
import './App.css';
import Viewport from './components/Viewport';

function App() {
  return (
    <main className='app'>
      <Header />
      <Nav />
      <Viewport />
    </main>
  );
}

export default App;
