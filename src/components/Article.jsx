import React from 'react';
import Voter from './Voter';
import Moment from 'react-moment';
import styles from '../styles/Article.module.css';

const Article = ({article}) => {
  return (
    <article className={styles.article}>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <p>Created: <Moment date={article.created_at} fromNow/></p>
      <Voter id={article.article_id} votes={article.votes} />
    </article>
  );
}
 
export default Article;