import React, {Component} from 'react';
import styles from '../styles/CommentList.module.css'
import CommentCard from './CommentCard';
import CreateComment from './CreateComment';
import * as api from '../utils/api'

class CommentList extends Component {

  state = {
    comments: null,
    isLoading: true,
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
  }

  updateComments = (comment) => {
    this.setState(({comments}) => {
      return {comments: [comment, ...comments]}
    })
  }

  render() {
    const {comments, isLoading, displayFilter} = this.state;
    const {username, article_id} = this.props;
    console.log(username);
    if(isLoading) return <p>Loading...</p>
    return (
      <section>
        <h3>Comments</h3>
        <button onClick={this.toggleDisplayFilter}>Filter</button>
        <CreateComment username={username} id={article_id} updateComments={this.updateComments}/>
        {
          displayFilter && <form onSubmit={this.handleSubmit}>
            <label htmlFor="sortBy">Sort By</label>
            <select onChange={this.handleChange} name="sortBy" value={this.state.filters.sortBy}>
              <option value="votes">Votes</option>
              <option value="author">Author</option>
              <option value="created_at">Date</option>
            </select>
            <label htmlFor="order">Order</label>
            <select onChange={this.handleChange} name="orderBy" value={this.state.filters.orderBy}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
            <input type="submit" value='Search'/>
          </form>
        }
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
  }
}
 
export default CommentList;