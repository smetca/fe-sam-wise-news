import React, {Component} from 'react';
import {Link} from '@reach/router';
import styles from '../styles/ArticleList.module.css';
import Voter from './Voter';

class ArticleCard extends Component {
  state = {}

  render() {
    const {article} = this.props;
    return (
      <li className={styles.article} key={article.article_id}>
        <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
        <Voter id={article.article_id} votes={article.votes}/>
        <div className={styles.comments}>
          <span>Comments: {article.comment_count}</span>
        </div>
      </li>
    );
  }
}
 
export default ArticleCard;