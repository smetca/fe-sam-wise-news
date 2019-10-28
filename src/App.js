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
import MediaQuery from 'react-responsive';
import BigNav from './components/BigNav';
import Particles from 'react-particles-js';


class App extends Component {

  canvas = React.createRef();

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
        <Particles canvasClassName='canvas'
          params={
            {"particles":{"number":{"value":71,"density":{"enable":true,"value_area":2000}},"color":{"value":"#000000"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#000000","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"bounce","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}
          }
        />
        <UserContext.Provider value={this.state}>
          <Header />
          <MediaQuery maxWidth={768}>
            <Nav changeUser={this.changeUser} />
          </MediaQuery>
          <MediaQuery maxWidth={768}>
            <LoggedIn />
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <BigNav username={username} avatar_url={avatar_url} changeUser={this.changeUser}/>
          </MediaQuery>
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






// const canvas = this.canvas.current;
//     const ctx = canvas.getContext("2d");
//     ctx.canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let particleMatrix;

//     let mouse = {
//       x: null,
//       y: null,
//       radius: (canvas.height/80) * (canvas.width/80)
//     };

//     window.addEventListener('mousemove',
//       function(event) {
//         mouse.x = event.x;
//         mouse.y = event.y;
//       }
//     );

//     class Particle {
//       constuctor(x, y, directionX, directionY, size, color) {
//         this.x = x;
//         this.y = y;
//         this.directionX = directionX;
//         this.directionY = directionY;
//         this.size = size;
//         this.color = color;
//       }

//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
//         ctx.fillStyle = '#8C5523';
//         ctx.fill();
//       }

//       update() {
//         if(this.x > canvas.width || this.x < 0) {
//           this.directionX = -this.directionX;
//         }
//         if(this.y > canvas.height || this.y < 0) {
//           this.directionY = -this.directionY;
//         }

//         let dx = mouse.x - this.x;
//         let dy = mouse.y - this.y;
//         let distance = Math.sqrt(dx*dx + dy*dy);
//         if(distance < mouse.radius + this.size) {
//           if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
//             this.x += 10;
//           }
//           if (mouse.x > this.x && this.x > this.size * 10) {
//             this.x -= 10;
//           }
//           if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
//             this.y += 10;
//           }
//           if (mouse.y > this.y && this.y > this.size * 10) {
//             this.y -= 10;
//           }
//         }

//         this.x += this.directionX;
//         this.y += this.directionY;

//         this.draw();
//       }
//     }

//     function init() {
//       particleMatrix = [];
//       let numberOfParticles = (canvas.height * canvas.width) / 9000;
//       for(let i = 0; i < numberOfParticles; i++) {
//         let size = (Math.random() * 5) + 1;
//         let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2 )) + size * 2);
//         let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
//         let directionX = (Math.random() * 5) - 2.5;
//         let directionY = (Math.random() * 5) - 2.5;
//         let color = '#83DDDD';
        
//         particleMatrix.push(new Particle(x, y, directionX, directionY, size, color));
//       }
//     }

//     function animate() {
//       requestAnimationFrame(animate);
//       ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

//       for(let i = 0; i < particleMatrix.length; i++) {
//         particleMatrix[i].update();
//       }

//       connect();
//     }

//     function connect() {
//       for(let a = 0; a < particleMatrix.length; a++) {
//         for(let b = a; b < particleMatrix.length; b++) {
//           let distance = ((particleMatrix[a].x - particleMatrix[b].x) * (particleMatrix[a].x - particleMatrix[b].x))
//             * ((particleMatrix[a].y - particleMatrix[b].y) * (particleMatrix[a].y - particleMatrix[b].y));
//             if(distance < (canvas.width / 7) * (canvas.height / 7)) {
//               ctx.strokeStyle = 'rgba(140, 85, 31, 1)';
//               ctx.lineWidth = 1;
//               ctx.beginPath();
//               ctx.moveTo(particleMatrix[a].x, particleMatrix[a].y);
//               ctx.lineTo(particleMatrix[b].x, particleMatrix[b].y);
//               ctx.stroke();
//             }
//         }
//       }
//     }
    
//     init();
//     animate();