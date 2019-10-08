import React, { Component } from 'react';
import * as api from '../utils/api';
import styles from '../styles/SingleArticle.module.css'

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: null,
    comments: null
  }

  componentDidMount() {
    const {article_id} = this.props;
    api.getArticle(article_id)
      .then(article => {
        const comments = api.getArticleComments(article_id);
        return Promise.all([article, comments])
      }).then(([article, comments]) => {
        this.setState({article, comments, isLoading: false});
      })
  }

  render() {
    const {article, comments, isLoading} = this.state;
    if(isLoading) return <p>Loading...</p>
    return (
      <section>
        <article>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
        </article>
        <ul className={styles.comments}>
          <h3>Comments</h3>
          {
            comments.map(comment => {
              return (
                <li>
                  <p>{comment.body}</p>
                  <span>{comment.author}</span>
                  <span>{comment.votes}</span>
                </li>
              )
            })
          }

        </ul>
      </section>
    );
  }
}
 
export default SingleArticle;