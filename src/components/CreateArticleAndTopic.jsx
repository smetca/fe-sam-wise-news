import React from 'react';
import styles from '../styles/CreateArticleAndTopic.module.css'
import {Link} from '@reach/router'

const CreateArticleAndTopic = () => {
  return (
    <section className={styles.create}>
      <h2 className={styles.heading}>Create Article</h2>
      <Link to='/article/create' className={styles['create-article']}>Create Article</Link>
    </section>
  );
}
 
export default CreateArticleAndTopic;