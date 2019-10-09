import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea'
import styles from '../styles/CreateComment.module.css';
import * as api from '../utils/api'

class CreateComment extends Component {
  state = {
    body: ''
  }

  handleChange = (event) => {
    event.preventDefault();
    const {value} = event.target;
    this.setState({body: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {body} = this.state;
    const {username, id, updateComments} = this.props;
    api.postComment(id, {username, body})
      .then(comment => {
        updateComments(comment);
        this.setState({body: ''})
      })
  }

  render() {
    const {body} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextareaAutosize onChange={this.handleChange} value={body} maxLength={500} className={styles.textbox} rows={3} required/>
        {
          body.length > 400 && <span>{body.length}/500</span>
        }
        <input type="submit"/>
      </form>
    );
  }
}
 
export default CreateComment;