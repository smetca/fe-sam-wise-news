import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api';

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
              <li className={styles.article} key={article.article_id}>
                <h3>{article.title}</h3>
                <div className={styles.voter}>
                  <button>Up</button>
                  <span>{article.votes}</span>
                  <button>Down</button>
                </div>
                <div className={styles.comments}>
                  <span>Comments: {article.comment_count}</span>
                </div>
              </li>
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