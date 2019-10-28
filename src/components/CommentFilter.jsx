import React from 'react';
import styles from '../styles/CommentFilter.module.css';

const CommentFilter = ({handleSubmit, handleChange, sortBy, orderBy}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="sortBy">Sort By</label>
      <select onChange={handleChange} name="sortBy" value={sortBy} aria-label='Sort By'>
        <option value="votes">Votes</option>
        <option value="author">Author</option>
        <option value="created_at">Date</option>
      </select>
      <label htmlFor="order">Order</label>
      <select onChange={handleChange} name="orderBy" value={orderBy} aria-label='Order By'>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <input type="submit" value='Search'/>
    </form>
  );
}
 
export default CommentFilter;