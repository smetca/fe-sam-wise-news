import React, {Component} from 'react';
import {Link} from '@reach/router';
import styles from '../styles/ArticleList.module.css';
import Voter from './Voter';
import Moment from 'react-moment';

class ArticleCard extends Component {
  state = {}

  render() {
    const {article} = this.props;
    return (
      <li className={styles.article}>
        <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
        <p>Created: <Moment date={article.created_at} fromNow/></p>
        <Voter id={article.article_id} votes={article.votes}/>
        <div className={styles.comments}>
          <span>Comments: {article.comment_count}</span>
        </div>
      </li>
    );
  }
}
 
export default ArticleCard;