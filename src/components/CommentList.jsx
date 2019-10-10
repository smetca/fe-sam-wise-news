import React, {Component} from 'react';
import styles from '../styles/CommentList.module.css'
import CommentCard from './CommentCard';
import CreateComment from './CreateComment';
import * as api from '../utils/api'
import CommentFilter from './CommentFilter';
import Loader from './Loader';
import ErrorHandler from './ErrorHandler';

class CommentList extends Component {

  state = {
    comments: null,
    isLoading: true,
    error: null,
    displayFilter: false,
    filters: {
      sortBy: 'votes',
      orderBy: 'desc'
    }
  }

  toggleDisplayFilter = (event) => {
    event.preventDefault();
    this.setState(({displayFilter}) => {
      return {displayFilter: !displayFilter}
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const newVal = event.target.value;
    this.setState(({filters}) => {
      const {[name]: oldVal, ...rest} = filters
      return {
        filters: {
          [name]: newVal,
          ...rest
        }
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    api.getArticleComments(this.props.article_id, this.state.filters)
      .then(comments => {
        this.setState({comments})
      })
      .catch(error => {
        this.setState({error, isLoading: false})
      })
  }

  updateComments = (comment) => {
    this.setState(({comments}) => {
      return {comments: [comment, ...comments]}
    })
  }

  render() {
    const {comments, isLoading, displayFilter, error} = this.state;
    const {username, article_id} = this.props;
    console.log(username);
    if(isLoading) return <Loader loading={isLoading}/>
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg}/>
    return (
      <section className={styles.comments}>
        <div className={styles.heading}>
          <h3 className={styles.heading}>Comments</h3>
          <button onClick={this.toggleDisplayFilter}>Filter</button>
        </div>
        {
          displayFilter && <CommentFilter
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            sortBy={this.state.filters.sortBy}
            orderBy={this.state.filters.orderBy}
          />
        }
        <CreateComment username={username} id={article_id} updateComments={this.updateComments}/>
        <ul className={styles.comments}>
          {
            comments && comments.map(comment => {
              return (
                <CommentCard comment={comment} key={comment.comment_id} username={username}/>
              )
            })
          }
        </ul>
      </section>
    );
  }

  componentDidMount() {
    const {article_id} = this.props;
    api.getArticleComments(article_id, this.state.filters)
      .then(comments => {
        this.setState({comments, isLoading: false})
      })
      .catch(error => {
        this.setState({error, isLoading: false})
      })
  }
}
 
export default CommentList;