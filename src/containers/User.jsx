import React from 'react';
import {Router} from '@reach/router';
import UserProfile from '../components/UserProfile';
import UserContext from '../components/UserContext';

const User = ({myUsername, myAvatar, myName}) => {
  return (
    <UserContext.Consumer>
      {
        ({username, avatar_url, name}) => (
          <Router>
            <UserProfile myUsername={username} myAvatar={avatar_url} myName={name} path={`/${myUsername}`}/>
            <UserProfile path='/:username' />
          </Router>
        )
      }
    </UserContext.Consumer>
  );
}
 
export default User;