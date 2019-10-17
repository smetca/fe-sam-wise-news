import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styles from '../styles/CreateArticle.module.css';
import * as api from '../utils/api';
import {navigate} from '@reach/router';
import ErrorHandler from './ErrorHandler';
import Loader from './Loader';

class CreateArticle extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    topic: 'coding',
    error: null,
    isLoading: true
  }

  handleChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {title, body, author, topic} = this.state;
    if(!author.length) {
      window.alert('You must login to post an article');
    } else {
      api.postArticle({title, body, author, topic})
        .then(article => {
          navigate(`/articles/${article.article_id}`);
        })
        .catch(error => {
          this.setState({error})
        })
    }
  }

  render() {
    const {title, topic, body, error, isLoading} = this.state;
    // if(!this.state.author.length) return <p>No user logged in</p>
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg}/>
    if(isLoading) return <Loader loading={isLoading} />
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor="title">Title</label>
        <input onChange={this.handleChange} value={title} type="text" name="title" placeholder="Article Title..." required/>
        <label htmlFor="topic">Topic</label>
        <select onChange={this.handleChange} name="topic" value={topic} className={styles.dropdown}>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="football">Football</option>
        </select>
        <label htmlFor="body">Article Body</label>
        <TextareaAutosize onChange={this.handleChange} name="body" value={body} maxLength={3000} className={styles.textbox} rows={3} placeholder="Article Body Here..." required/>
        <input type="submit" value="Post Article"/>
      </form>
    );
  }

  componentDidMount() {
    const {username} = this.props;
    this.setState({author: username, isLoading: false});
  }

  componentDidUpdate(prevProps) {
    const {username} = this.props;
    const {username: prevUsername} = prevProps;
    if(prevUsername !== username) {
      this.setState({author: username})
    }
  }
}
 
export default CreateArticle;