import React, { Component } from 'react';
import * as api from '../utils/api';
import Article from '../components/Article';
import CommentList from '../components/CommentList';
import Loader from '../components/Loader';
import ErrorHandler from '../components/ErrorHandler';

class SingleArticle extends Component {
  state = {
    isLoading: true,
    error: null,
    article: null
  }

  render() {
    const {article, isLoading, error} = this.state;
    if(isLoading) return <Loader loading={isLoading}/>
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg} />
    return (
      <section>
        <Article article={article} />
        <CommentList article_id={article.article_id} comment_count={article.comment_count} />
      </section>
    );
  }

  componentDidMount() {
    const {article_id} = this.props;
    api.getArticle(article_id)
      .then(article => {
        this.setState({article, isLoading: false});
      })
      .catch(error => {
        this.setState({error, isLoading: false})
      })
  }
}
 
export default SingleArticle;