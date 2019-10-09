import React, {Component} from 'react';
import Voter from './Voter';
import * as api from '../utils/api'
import Moment from 'react-moment';

class CommentCard extends Component {

  state = {
    deleted: false
  }

  deleteComment = (event) => {
    event.preventDefault();
    const {comment} = this.props;
    if(window.confirm('Do you want to delete this comment?')) {
      this.setState({deleted: true});
      api.deleteComment(comment.comment_id)
        .then(status => {

        })
        .catch(console.dir)
    }
  }

  render() {
    const {deleted} = this.state;
    const {comment, username} = this.props;
    if(deleted) return <li>Comment deleted</li>
    return (
        <li>
          <p>{comment.body}</p>
          <span>{comment.author}</span>
          <span>Created: <Moment date={comment.created_at} fromNow/></span>
          <Voter id={comment.comment_id} votes={comment.votes} type={'comment'}/>
          {
            username === comment.author && <button onClick={this.deleteComment}>Delete Comment</button>
          }
        </li>
    );

  }
}
 
export default CommentCard;