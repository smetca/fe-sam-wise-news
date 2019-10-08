import React from 'react';
import ArticleShowcase from '../components/ArticleShowcase';
import CreateArticleAndTopic from '../components/CreateArticleAndTopic';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <section className={styles.home}>
      <ArticleShowcase />
      <CreateArticleAndTopic />
    </section>
  );
}
 
export default Home;