import React, { Component } from 'react';
import styles from './Viewport.module.css'
import ArticleShowcase from './ArticleShowcase';
import CreateArticleAndTopic from './CreateArticleAndTopic';

class Viewport extends Component {
  state = {  }
  render() { 
    return (
      <section className={styles.viewport}>
        <ArticleShowcase />
        <CreateArticleAndTopic />
      </section>
    );
  }
}
 
export default Viewport;