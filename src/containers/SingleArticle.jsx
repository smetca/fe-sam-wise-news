import React, { Component } from 'react';
import * as api from '../utils/api';
import Article from '../components/Article';
import CommentList from '../components/CommentList';

class SingleArticle extends Component {
  state = {
    isLoading: true,
    article: null,
  }

  render() {
    const {article, isLoading} = this.state;
    console.dir(this.props.username);
    if(isLoading) return <p>Loading...</p>
    return (
      <section>
        <Article article={article} username={this.props.username} avatar={this.props.avatar_url} name={this.props.name}/>
        <CommentList article_id={article.article_id} username={this.props.username}/>
      </section>
    );
  }

  componentDidMount() {
    const {article_id} = this.props;
    api.getArticle(article_id)
      .then(article => {
        this.setState({article, isLoading: false});
      })
  }
}
 
export default SingleArticle;