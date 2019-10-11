import React, {Component} from 'react';
import styles from '../styles/CommentList.module.css'
import CommentCard from './CommentCard';
import CreateComment from './CreateComment';
import * as api from '../utils/api'
import CommentFilter from './CommentFilter';
import Loader from './Loader';
import ErrorHandler from './ErrorHandler';
import throttle from 'lodash.throttle';

class CommentList extends Component {

  state = {
    comments: null,
    isLoading: true,
    error: null,
    displayFilter: false,
    maxPage: 1,
    filters: {
      sortBy: 'votes',
      orderBy: 'desc',
      limit: '5',
      p: 1
    }
  }

  addScrollEventListener = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = throttle((event) => {
    const distanceFromTop = window.scrollY;
    const heightOfScreen = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if(documentHeight - 400 <= distanceFromTop + heightOfScreen && this.state.filters.p < this.state.maxPage) {
      this.setState(({filters}) => {
        const {p, ...rest} = filters;
        return {
          filters: {
            p: p+1,
            ...rest
          }
        }
      }, () => {
        api.getArticleComments(this.props.article_id, this.state.filters)
          .then(comments => {
            this.setState((currentState) => {
              return {comments: [...currentState.comments, ...comments]}
            })
          })
      })
    }
  }, 2000)

  fetchArticleComments = () => {
    const {article_id, comment_count} = this.props;
    api.getArticleComments(article_id, this.state.filters)
      .then(comments => {
        const maxPage = Math.ceil(comment_count / this.state.filters.limit)
        this.setState({comments, isLoading: false, maxPage})
      })
      .catch(error => {
        this.setState({error, isLoading: false})
      })
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
    this.fetchArticleComments();
  }

  updateComments = (comment) => {
    this.setState(({comments}) => {
      return {comments: [comment, ...comments]}
    })
  }

  render() {
    const {comments, isLoading, displayFilter, error} = this.state;
    const {username, article_id, comment_count} = this.props;
    console.log(username);
    if(isLoading) return <Loader loading={isLoading}/>
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg}/>
    return (
      <section className={styles.comments}>
        <div className={styles.heading}>
          <h3 className={styles.heading}>Comments | {comment_count}</h3>
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
    this.fetchArticleComments();
    this.addScrollEventListener();
  }
}
 
export default CommentList;