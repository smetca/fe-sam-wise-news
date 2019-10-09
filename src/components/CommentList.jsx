import React, {Component} from 'react';
import styles from '../styles/CommentList.module.css'
import CommentCard from './CommentCard';
import CreateComment from './CreateComment';
import * as api from '../utils/api'

class CommentList extends Component {

  state = {
    comments: null,
    isLoading: true
  }

  updateComments = (comment) => {
    this.setState(({comments}) => {
      return {comments: [comment, ...comments]}
    })
  }

  render() {
    const {comments, isLoading} = this.state;
    const {username, article_id} = this.props;
    if(isLoading) return <p>Loading...</p>
    return (
      <section>
        <ul className={styles.comments}>
          <h3>Comments</h3>
          <CreateComment username={username} id={article_id} updateComments={this.updateComments}/>
          {
            comments && comments.map(comment => {
              return (
                <CommentCard comment={comment} key={comment.comment_id}/>
              )
            })
          }
        </ul>
      </section>
    );
  }

  componentDidMount() {
    const {article_id} = this.props;
    api.getArticleComments(article_id)
      .then(comments => {
        this.setState({comments, isLoading: false})
      })
  }
}
 
export default CommentList;