import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';
import ArticleFilter from './ArticleFilter';
import Loader from './Loader';
import ErrorHandler from './ErrorHandler';

class ArticleList extends Component {

  state = {
    articles: null,
    isLoading: true,
    error: null,
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
      .catch(error => {
        this.setState({error, isLoading: false})
      })
  }

  render() {
    const {articles, isLoading, displayFilter, error} = this.state;
    if(isLoading) return <Loader loading={isLoading} />
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg}/>
    return (
      <section className={styles.articles}>
        <h2 className={styles.heading}>Articles</h2>
        <div className={styles.filter}>
          <button onClick={this.toggleDisplayFilter}>Filters {displayFilter ? '-' : '+'}</button>
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
      .catch(error => {
        this.setState({error, isLoading: false})
      })
  }
}
 
export default ArticleList;