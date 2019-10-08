import React, { Component } from 'react';
import * as api from '../utils/api';

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: null
  }

  componentDidMount() {
    const {article_id} = this.props;
    api.getArticle(article_id)
      .then(article => {
        this.setState({article, isLoading: false});
      })
  }

  render() {
    const {article, isLoading} = this.state;
    if(isLoading) return <p>Loading...</p>
    return (
      <article>
        <h2>{article.title}</h2>
        <p>{article.body}</p>
      </article>
    );
  }
}
 
export default SingleArticle;