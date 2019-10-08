import React from 'react';
import styles from '../styles/CommentList.module.css'

const CommentList = ({comments}) => {
  return (
    <ul className={styles.comments}>
          <h3>Comments</h3>
          {
            comments.map(comment => {
              return (
                <li key={comment.comment_id}>
                  <p>{comment.body}</p>
                  <span>{comment.author}</span>
                  <span>{comment.votes}</span>
                </li>
              )
            })
          }

        </ul>
  );
}
 
export default CommentList;