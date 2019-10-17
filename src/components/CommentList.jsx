import React, {Component} from 'react';
import styles from '../styles/CommentList.module.css'
import CommentCard from './CommentCard';
import CreateComment from './CreateComment';
import * as api from '../utils/api'
import CommentFilter from './CommentFilter';
import Loader from './Loader';
import ErrorHandler from './ErrorHandler';
import throttle from 'lodash.throttle';
import UserContext from './UserContext';

class CommentList extends Component {

  state = {
    comments: null,
    isLoading: true,
    pageLoading: false,
    error: null,
    displayFilter: false,
    maxPage: 1,
    filters: {
      sortBy: 'votes',
      orderBy: 'desc',
      limit: '10',
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
          },
          pageLoading: true
        }
      }, () => {
        api.getArticleComments(this.props.article_id, this.state.filters)
          .then(comments => {
            this.setState((currentState) => {
              return {comments: [...currentState.comments, ...comments], pageLoading: false}
            })
          })
      })
    }
  }, 1300)

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
    const {comments, isLoading, displayFilter, error, pageLoading} = this.state;
    const {article_id, comment_count} = this.props;
    if(isLoading) return <Loader loading={isLoading}/>
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg}/>
    return (
      <UserContext.Consumer>
        {
          ({username}) => (
            <section className={styles.comments}>
              <div className={styles.heading}>
                <h3 className={styles.heading}>Comments | {comment_count}</h3>
                <button onClick={this.toggleDisplayFilter}>Filter</button>
              </div>
              {
                displayFilter &&
                  <CommentFilter
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
                {
                  pageLoading && <li>
                    <Loader loading={pageLoading} />
                  </li>
                }
              </ul>
            </section>
          )
        }
      </UserContext.Consumer>
    );
  }

  componentDidMount() {
    this.fetchArticleComments();
    this.addScrollEventListener();
  }

  componentDidUpdate(prevProps, prevState) {
    const {sortBy, orderBy} = prevState.filters;
    let isDifferent = false;
    if(sortBy !== this.state.filters.sortBy) isDifferent = true;
    if(orderBy !== this.state.filters.orderBy) isDifferent = true;
    if(isDifferent) {
      this.setState((currentState) => {
        const {p, ...rest} = currentState.filters;
        return {
          filters: {
            p: 1,
            ...rest
          }
        }
      })
    }
  }
}
 
export default CommentList;