import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {

  state = {
    articles: null,
    isLoading: true
  }

  render() {
    const {articles, isLoading} = this.state;
    if(isLoading) return (
      <p>Loading...</p>
    )
    return (
      <ul className={styles.list}>
        {
          articles && articles.map(article => {
            return (
              <ArticleCard article={article} key={article.article_id}/>
            )
          })
        }
      </ul>
    );
  }

  componentDidMount() {
    api.getArticles()
      .then(articles => {
        this.setState({articles, isLoading: false})
      })
  }

}
 
export default ArticleList;