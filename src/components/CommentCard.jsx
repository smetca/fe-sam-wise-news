import React, {Component} from 'react';
import Voter from './Voter';
import * as api from '../utils/api'
import Moment from 'react-moment';
import styles from '../styles/CommentCard.module.css'
import ErrorHandler from './ErrorHandler';
import Loader from './Loader';

class CommentCard extends Component {

  state = {
    deleted: false,
    error: null,
    isLoading: true,
    username: '',
    avatar: '',
  }

  deleteComment = (event) => {
    event.preventDefault();
    const {comment} = this.props;
    if(window.confirm('Do you want to delete this comment?')) {
      this.setState({deleted: true});
      api.deleteComment(comment.comment_id)
        .catch(error => {
          this.setState({deleted: false})
        })
    }
  }

  render() {
    const {deleted, avatar, error, isLoading} = this.state;
    const {comment, username} = this.props;
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg} />
    if(isLoading) return <Loader loading={isLoading}/>
    if(deleted) return <li>Comment deleted</li>
    return (
        <li className={styles.comment}>
          <p>{comment.body}</p>
          <div className={styles['author-wrapper']}>
            <div className={styles.author}>
              <span><img src={avatar} alt="Users Avatar"/> {comment.author}</span>
              <span>Created: <Moment date={comment.created_at} fromNow/></span>
            </div>
            {
              username === comment.author && <button className={styles.delete} onClick={this.deleteComment}>Delete Comment</button>
            }
          </div>
          <Voter id={comment.comment_id} votes={comment.votes} type={'comment'}/>
        </li>
    );

  }

  componentDidMount() {
    api.getUser(this.props.comment.author)
      .then(user => {
        this.setState({username: user.username, avatar: user.avatar_url, isLoading: false})
      })
      .catch(error => {
        this.setState({error, isLoading: false})
      })
  }
}
 
export default CommentCard;