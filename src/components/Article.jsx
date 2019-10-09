import React from 'react';
import Voter from './Voter';

const Article = ({article}) => {
  return (
    <article>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <Voter id={article.article_id} votes={article.votes} />
    </article>
  );
}
 
export default Article;