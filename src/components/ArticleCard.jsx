import React from 'react';
import {Link} from '@reach/router';
import styles from '../styles/ArticleCard.module.css';
import Voter from './Voter';
import Moment from 'react-moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faCommentAlt, faBookOpen} from '@fortawesome/free-solid-svg-icons';

const ArticleCard = ({article}) => {
    return (
      <li className={styles.article}>
        <Link className={styles.title} to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
        <Voter id={article.article_id} votes={article.votes}/>
        <span className={styles.created}><FontAwesomeIcon icon={faCalendarAlt}/><em><Moment date={article.created_at} fromNow/></em></span>
        <div className={styles.comments}>
          <span><FontAwesomeIcon icon={faCommentAlt}/> {article.comment_count}</span>
        </div>
        <span className={styles.topic}><FontAwesomeIcon icon={faBookOpen} /> {article.topic}</span>
      </li>
    );
}
 
export default ArticleCard;