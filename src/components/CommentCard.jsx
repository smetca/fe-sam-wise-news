import React from 'react';
import Voter from './Voter';

const CommentCard = ({comment}) => {
  return (
    <li>
      <p>{comment.body}</p>
      <span>{comment.author}</span>
      <Voter id={comment.comment_id} votes={comment.votes} type={'comment'}/>
    </li>
  );
}
 
export default CommentCard;