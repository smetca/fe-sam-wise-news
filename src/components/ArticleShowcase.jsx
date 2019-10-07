import React, { Component } from 'react';
import styles from './ArticleShowcase.module.css';

class ArticleShowcase extends Component {
  state = {
    article: {
      title: "Seafood substitutions are increasing",
      topic: "cooking",
      author: "weegembump",
      article_id: 1,
      votes: 20,
      body: "Text from the article is here and I must type enough to fill the ellipses lorem ipsum dolor blah blah blah something something something really",
      created_at: 1527695953341,
      comment_count: 100
    }
  }

  render() {
    const { article } = this.state;
    return (
      <section className={styles.showcase}>
        <article>
          <h2>{article.title}</h2>
          <p>{article.body.slice(0, 100) + '...'}</p>
        </article>
        <button>
          View All Articles
        </button>
      </section>
    );
  }
}
 
export default ArticleShowcase;