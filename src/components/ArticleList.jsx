import React, { Component } from 'react';
import styles from '../styles/ArticleList.module.css';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';
import ArticleFilter from './ArticleFilter';
import Loader from './Loader';
import ErrorHandler from './ErrorHandler';
import throttle from 'lodash.throttle';

class ArticleList extends Component {

  state = {
    articles: null,
    isLoading: true,
    pageLoading: false,
    error: null,
    displayFilter: false,
    maxPage: 1,
    filters: {
      author: '',
      topic: '',
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

    if(documentHeight - 500 <= distanceFromTop + heightOfScreen && this.state.filters.p < this.state.maxPage) {
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
        api.getArticles(this.state.filters)
          .then(({articles}) => {
            this.setState((currentState) => {
              return {articles: [...currentState.articles, ...articles], pageLoading: false}
            })
          })
      })
    }
  }, 1000)

  fetchArticles = () => {
    api.getArticles(this.state.filters)
      .then(({articles, total_count}) => {
        const maxPage = Math.ceil(total_count / this.state.filters.limit);
        this.setState({articles, isLoading: false, maxPage})
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
    this.fetchArticles();
  }

  render() {
    const {articles, isLoading, displayFilter, error, pageLoading} = this.state;
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
          {
            pageLoading && <li>
              <Loader loading={pageLoading} />
            </li>
          }
        </ul>
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticles();
    this.addScrollEventListener();
  }

  componentDidUpdate(prevProps, prevState) {
    const {author, topic, sortBy, orderBy} = prevState.filters;
    let isDifferent = false;
    if(author !== this.state.filters.author) isDifferent = true;
    if(topic !== this.state.filters.topic) isDifferent = true;
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
 
export default ArticleList;