import React from 'react';
import {Router} from '@reach/router';
import UserProfile from '../components/UserProfile';

const User = ({myUsername, myAvatar, myName}) => {
  return (
    <Router>
      <UserProfile myUsername={myUsername} myAvatar={myAvatar} myName={myName} path={`/${myUsername}`}/>
      <UserProfile path='/:username' />
    </Router>
  );
}
 
export default User;