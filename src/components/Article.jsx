import React from 'react';

const Article = ({article}) => {
  return (
    <article>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
    </article>
  );
}
 
export default Article;