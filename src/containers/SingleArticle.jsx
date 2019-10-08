import React, { Component } from 'react';
import * as api from '../utils/api';
import Article from '../components/Article';
import CommentList from '../components/CommentList';

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
        <Article article={article}/>
        <CommentList comments={comments}/>
      </section>
    );
  }
}
 
export default SingleArticle;