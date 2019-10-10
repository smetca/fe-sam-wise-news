import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';
import ArticleFilter from './ArticleFilter';

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
      <section className={styles.articles}>
        <div className={styles.filter}>
          <button onClick={this.toggleDisplayFilter}>Filters</button>
          {
            displayFilter &&
              <ArticleFilter 
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                sortBy={this.state.filters.sortBy}
                topic={this.state.filters.topic}
                orderBy={this.state.filters.orderBy}
                author={this.state.filters.author}
                />
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
      </section>
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