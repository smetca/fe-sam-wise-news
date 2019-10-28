import React from 'react';
import styles from '../styles/ArticleFilter.module.css'
import { useSpring, animated } from 'react-spring';

const ArticleFilter = ({
  handleSubmit,
  handleChange,
  sortBy,
  topic,
  orderBy,
  author,
  users
}) => {
  const fade = useSpring({opacity: 1, from: {opacity: 0}});
  return (
    <animated.form style={fade} className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="sortBy">Sort By</label>
      <select onChange={handleChange} name="sortBy" value={sortBy} aria-label='Sort By'>
        <option value="votes">Votes</option>
        <option value="title">Title</option>
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
      </select>
      <label className={styles.order} htmlFor="order">Order</label>
      <select className={styles.order} onChange={handleChange} name="orderBy" value={orderBy} aria-label='Order By'>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <label htmlFor="topic">Topics</label>
      <select onChange={handleChange} name="topic" value={topic} aria-label='Topics'>
        <option value="">All</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>
      <label htmlFor="author">Author</label>
      <select onChange={handleChange} type="text" name='author' value={author} aria-label='Author'>
        <option value="">All</option>
        {
          users && users.map(user => {
            return <option value={user.username} key={user.username}>{user.username}</option>
          })
        }
      </select>
      <input type="submit" value='Search'/>
    </animated.form>
  );
}
 
export default ArticleFilter;