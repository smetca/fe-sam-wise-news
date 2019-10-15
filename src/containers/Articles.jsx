import React from 'react';
import styles from '../styles/Articles.module.css';
import ArticleList from '../components/ArticleList';
import {Router} from '@reach/router'

const Articles = () => {
  return (
    <section className={styles.articles}>
      <Router>
        <ArticleList path='/' topic={''}/>
        <ArticleList path='/topic/:topic' />
      </Router>
    </section>
  );
}
 
export default Articles;