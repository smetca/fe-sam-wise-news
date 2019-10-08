import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api';
import {Link} from '@reach/router'

class ArticleList extends Component {

  state = {
    articles: null,
    isLoading: true
  }

  handleVote = (event) => {
    event.preventDefault();
    const changeVote = {
      inc_votes: Number(event.target.value)
    }
    api.updateVote(changeVote, event.target.name)
      .then(response => {
        this.setState((currentState) => {
          let {articles} = currentState;
          const articleIndex = articles.findIndex(article => {
            return article.article_id === response.article_id;
          })
          const {comment_count} = articles[articleIndex];
          articles[articleIndex] = {...response, comment_count};
          return {articles};
        })
      })
      .catch(console.dir)
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
                <Link to={`/articles/${article.article_id}`}><h3>{article.title}</h3></Link>
                <div className={styles.voter}>
                  <button value='1' name={article.article_id} onClick={this.handleVote}>Up</button>
                  <span>{article.votes}</span>
                  <button value='-1' name={article.article_id} onClick={this.handleVote}>Down</button>
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