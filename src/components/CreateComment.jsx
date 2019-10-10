import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea'
import styles from '../styles/CreateComment.module.css';
import * as api from '../utils/api'

class CreateComment extends Component {
  state = {
    body: '',
    error: null
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
    if(!username.length) {
      window.alert('You must login to post a comment');
      this.setState({body: ''});
    } else {
      api.postComment(id, {username, body})
        .then(comment => {
          updateComments(comment);
          this.setState({body: ''})
        })
        .catch(error => {
          this.setState({error})
        })
    }
  }

  render() {
    const {body, error} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <TextareaAutosize onChange={this.handleChange} value={body} maxLength={500} className={styles.textbox} rows={3} placeholder='Write Comment here...' required/>
        {
          body.length > 400 && <span>{body.length}/500</span>
        }
        {
          error && <span className={styles.error}>Failed to post comment!</span>
        }
        <input className={styles.submit} type="submit"/>
      </form>
    );
  }
}
 
export default CreateComment;