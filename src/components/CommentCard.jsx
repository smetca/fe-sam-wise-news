import React, {Component} from 'react';
import Voter from './Voter';
import Moment from 'react-moment';

class CommentCard extends Component {

  state = {
    deleted: false
  }

  deleteComment = (event) => {
    event.preventDefault();
    if(window.confirm('Do you want to delete this comment?')) {
      this.setState({deleted: true});
    }
  }

  render() {
    const {deleted} = this.state;
    const {comment, username} = this.props;
    console.log(username);
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