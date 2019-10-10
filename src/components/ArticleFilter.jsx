import React from 'react';
import styles from '../styles/ArticleFilter.module.css'

const ArticleFilter = ({
  handleSubmit,
  handleChange,
  sortBy,
  topic,
  orderBy,
  author
}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="sortBy">Sort By</label>
      <select onChange={handleChange} name="sortBy" value={sortBy}>
        <option value="votes">Votes</option>
        <option value="title">Title</option>
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
      </select>
      <label htmlFor="order">Order</label>
      <select onChange={handleChange} name="orderBy" value={orderBy}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <label htmlFor="topic">Topics</label>
      <select onChange={handleChange} name="topic" value={topic}>
        <option value="">All</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>
      <label htmlFor="author">Author</label>
      <input onChange={handleChange} type="text" name='author' value={author}/>
      <input type="submit" value='Search'/>
    </form>
  );
}
 
export default ArticleFilter;