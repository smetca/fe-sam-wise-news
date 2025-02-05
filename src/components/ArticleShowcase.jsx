import React, { Component } from 'react';
import styles from '../styles/ArticleShowcase.module.css';
import {Link} from '@reach/router';
import * as api from '../utils/api';
import Moment from 'react-moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faArrowCircleUp, faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import ErrorHandler from './ErrorHandler';

class ArticleShowcase extends Component {
  state = {
    article: null,
    isLoading: true,
    error: null
  }

  render() {
    const { article, isLoading, error } = this.state;
    if(isLoading) return <Loader loading={isLoading}/>
    if(error) return <ErrorHandler status={error.response.status} msg={error.response.data.msg}/>
    else {
      return (
        <section className={styles.showcase}>
          <h2 className={styles.heading}>Top Article</h2>
          <article>
            <Link className={styles['body-link']} to={`articles/${article.article_id}`}>
            <h3 className={styles.title}>{article.title}</h3>
            <div className={styles.body}>
            {
              article.body.length >= 300
                ? article.body
                  .slice(0,300)
                  .split('\n')
                  .map((paragraph, index, array) => {
                    if(index < array.length - 1) {
                      return <p key={index}>{paragraph}</p>
                    } else {
                      return <p key={index}>{paragraph}...</p>
                    }
                  })
                : article.body
                    .split('\n')
                    .map((paragraph, index) => {
                      return <p key={index}>{paragraph}</p>
                    })
            }
            </div>
            </Link>
          </article>
          <div className={styles.info}>
            <span className={styles.date}><FontAwesomeIcon icon={faCalendarAlt}/> <em><Moment date={article.created_at} fromNow/></em></span>
            <span className={styles.votes}><FontAwesomeIcon icon={faArrowCircleUp}/> {article.votes}</span>
            <span className={styles.comments}><FontAwesomeIcon icon={faCommentAlt}/> {article.comment_count}</span>
          </div>
          <Link to='/articles' className={styles['articles-link']}>
            View All Articles
          </Link>
        </section>
      );
    }
  }

  componentDidMount() {
    api.getArticles({limit: 1, sortBy: 'votes'})
      .then(({articles: [article]}) => {
        this.setState({article, isLoading: false})
      })
      .catch(error => {
        console.dir(error);
        this.setState({error, isLoading: false})
      })
  }

}
 
export default ArticleShowcase;