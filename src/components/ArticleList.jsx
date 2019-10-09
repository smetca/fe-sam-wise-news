import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {

  state = {
    articles: null,
    isLoading: true,
    displayFilter: false,
    filters: {
      author: '',
      topic: '',
      sortBy: 'votes',
      orderBy: 'desc',
      limit: '5'
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
    api.getArticles(this.state.filters)
      .then(articles => {
        this.setState({articles})
      })
  }

  render() {
    const {articles, isLoading, displayFilter} = this.state;
    if(isLoading) return (
      <p>Loading...</p>
    )
    return (
      <>
        <div>
          <button onClick={this.toggleDisplayFilter}>Filters</button>
          {
            displayFilter &&
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="sortBy">Sort By</label>
                <select onChange={this.handleChange} name="sortBy" value={this.state.filters.sortBy}>
                  <option value="votes">Votes</option>
                  <option value="title">Title</option>
                  <option value="created_at">Date</option>
                </select>
                <label htmlFor="topic">Topics</label>
                <select onChange={this.handleChange} name="topic" value={this.state.filters.topic}>
                  <option value="">All</option>
                  <option value="coding">Coding</option>
                  <option value="football">Football</option>
                  <option value="cooking">Cooking</option>
                </select>
                <label htmlFor="order">Order</label>
                <select onChange={this.handleChange} name="orderBy" value={this.state.filters.orderBy}>
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
                <label htmlFor="author">Author</label>
                <input onChange={this.handleChange} type="text" name='author' value={this.state.filters.author}/>
                <input type="submit" value='Search'/>
              </form>
          }
        </div>
        <ul className={styles.list}>
          {
            articles && articles.map(article => {
              return (
                <ArticleCard article={article} key={article.article_id}/>
              )
            })
          }
        </ul>
      </>
    );
  }

  componentDidMount() {
    api.getArticles(this.state.filters)
      .then(articles => {
        this.setState({articles, isLoading: false})
      })
  }
}
 
export default ArticleList;