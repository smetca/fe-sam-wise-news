import React from 'react';
import styles from '../styles/CommentList.module.css'
import CommentCard from './CommentCard';

const CommentList = ({comments}) => {
  return (
    <section>
      <ul className={styles.comments}>
        <h3>Comments</h3>
        {
          comments.map(comment => {
            return (
              <CommentCard comment={comment} key={comment.comment_id}/>
            )
          })
        }
      </ul>
    </section>
  );
}
 
export default CommentList;