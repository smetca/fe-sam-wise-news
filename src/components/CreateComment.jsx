import React, { Component } from 'react';

class CreateComment extends Component {
  state = {
    body: ''
  }

  render() { 
    return (
      <form>
        <textarea rows='7' cols='20'/>
        <input type="submit"/>
      </form>
    );
  }
}
 
export default CreateComment;