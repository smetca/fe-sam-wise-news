import React from 'react';
import styles from './CreateArticleAndTopic.module.css'

const CreateArticleAndTopic = () => {
  return (
    <section className={styles.create}>
      <button>Create Article</button>
      <button>Create Topic</button>
    </section>
  );
}
 
export default CreateArticleAndTopic;