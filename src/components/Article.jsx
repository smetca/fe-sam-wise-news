import React, {Component} from 'react';
import Voter from './Voter';
import Moment from 'react-moment';
import styles from '../styles/Article.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faBookOpen} from '@fortawesome/free-solid-svg-icons';
import * as api from '../utils/api';
import Loader from './Loader';

class Article extends Component {

  state = {
    authorName: '',
    authorAvatar: '',
    isLoading: true
  }

  componentDidMount() {
    const {article} = this.props;
    api.getUser(article.author)
      .then(user => {
        this.setState({authorName: user.name, authorAvatar: user.avatar_url, isLoading: false})
      })
  }

  render() {
    const {article} = this.props;
    const {authorName, authorAvatar, isLoading} = this.state;
    if(isLoading) return <Loader loading={isLoading}/>
    return (
      <article className={styles.article}>
        <h2>{article.title}</h2>
        <p>{article.body}</p>
        <div className={styles.info}>
        <em className={styles.author}><img src={authorAvatar} alt="Author's avatar"/> {authorName}</em>
          <div className={styles.created}>
            <FontAwesomeIcon icon={faCalendarAlt}/>
            <em><Moment date={article.created_at} fromNow/></em>
          </div>
          <div className={styles.topic}>
            <FontAwesomeIcon icon={faBookOpen} />
            {article.topic}
          </div>
        </div>
        <Voter id={article.article_id} votes={article.votes} />
      </article>
    );
  }
}
 
export default Article;