import React, {Component} from 'react';
import * as api from '../utils/api';
import ErrorHandler from './ErrorHandler';
import OwnProfile from './OwnProfile';
import OtherProfile from './OtherProfile';
import Loader from './Loader';

class UserProfile extends Component {

  _isMounted = false;

  state = {
    error: null,
    isLoading: true,
    user: null
  }

  render() {
    const {myUsername, myAvatar, myName} = this.props;
    const {error, user, isLoading} = this.state;

    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg}/>
    if(isLoading) return <Loader loading={isLoading} />
    if(user) return (
      <OtherProfile user={user} />
    );
    else return (
      <OwnProfile myUsername={myUsername} myAvatar={myAvatar} myName={myName} />
    );
  }

  componentDidMount() {
    const {myUsername, username} = this.props;
    if(!myUsername) {
      api.getUser(username)
        .then(user => {
          if(this._isMounted) {
            this.setState({user, isLoading: false});
          }
        })
        .catch(error => {
          if(this._isMounted) {
            this.setState({error, isLoading: false});
          }
        })
    } else if(myUsername) {
      this.setState({isLoading: false});
    }
  }

  componentDidUpdate(prevProps) {
    const {myUsername, username} = this.props;
    if(myUsername && prevProps.myUsername !== myUsername) {
      this.setState({user: null})
    } else if(!myUsername && prevProps.myUsername !== myUsername) {
      api.getUser(username)
        .then(user => {
          if(this._isMounted) {
            this.setState({user})
          }
        })
        .catch(error => {
          if(this._isMounted) {
            this.setState({error})
          }
        })
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}
 
export default UserProfile;