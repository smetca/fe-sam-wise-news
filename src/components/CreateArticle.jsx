import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

class CreateArticle extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    topic: '',
  }
  render() {
    if(!this.state.author.length) return <p>No user logged in</p>
    return (
      <form>
      </form>
    );
  }

  componentDidMount() {
    const {username} = this.props;
    if(username.length) {
      this.setState({author: username})
    }
  }
}
 
export default CreateArticle;