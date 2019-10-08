import React, { Component } from 'react';
import styles from '../styles/ArticleShowcase.module.css';

class ArticleShowcase extends Component {
  state = {
    article: {
      title: "Seafood substitutions are increasing",
      topic: "cooking",
      author: "weegembump",
      article_id: 1,
      votes: 20,
      body: `Text from the article is here and I must type enough to fill the ellipses lorem ipsum dolor blah blah blah something something something really. This is a sentence of some sort. Keep reading until the ellipses
        The dog crossed the road with his owner, and something happened. Look at that in the distance something something
        lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor words words words words`,
      created_at: 1527695953341,
      comment_count: 100
    }
  }

  render() {
    const { article } = this.state;
    return (
      <section className={styles.showcase}>
        <h2>Top Article</h2>
        <article>
          <h3>{article.title}</h3>
          {
            article.body.length >= 300
              ? article.body
                .slice(0,300)
                .split('\n')
                .map((paragraph, index, array) => {
                  if(index < array.length - 1) {
                    return <p key={index}>{paragraph}</p>
                  } else {
                    return <p key={index}>{paragraph}...</p>
                  }
                })
              : article.body
                  .split('\n')
                  .map((paragraph, index) => {
                    return <p key={index}>{paragraph}</p>
                  })
          }
        </article>
        <button>
          View All Articles
        </button>
      </section>
    );
  }
}
 
export default ArticleShowcase;