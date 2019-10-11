import React from 'react';
import {Link} from '@reach/router';
import styles from '../styles/ArticleCard.module.css';
import Voter from './Voter';
import Moment from 'react-moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faCommentAlt} from '@fortawesome/free-solid-svg-icons';

const ArticleCard = ({article}) => {
    return (
      <li className={styles.article}>
        <Link className={styles.title} to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
        <span className={styles.created}><FontAwesomeIcon icon={faCalendarAlt}/><em><Moment date={article.created_at} fromNow/></em></span>
        <Voter id={article.article_id} votes={article.votes}/>
        <div className={styles.comments}>
          <span><FontAwesomeIcon icon={faCommentAlt}/> {article.comment_count}</span>
        </div>
      </li>
    );
}
 
export default ArticleCard;