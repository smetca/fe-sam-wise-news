import React from 'react';
import styles from '../styles/Articles.module.css';
import ArticleList from '../components/ArticleList';

const Articles = () => {
  return (
    <section className={styles.articles}>
      <ArticleList />
    </section>
  );
}
 
export default Articles;