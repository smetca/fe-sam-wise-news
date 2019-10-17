import React from 'react';

const UserContext = React.createContext({
  username: '',
  avatar_url: '',
  name: ''
});

export default UserContext;