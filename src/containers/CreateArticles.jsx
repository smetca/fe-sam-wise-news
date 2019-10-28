import React from 'react';
import CreateArticle from '../components/CreateArticle';
import UserContext from '../components/UserContext';
import styles from '../styles/CreateArticles.module.css';

const CreateArticles = () => {
  return (
    <section className={styles.create}>
      <h2>Create an Article!</h2>
      <UserContext.Consumer>
        {
          ({username}) => <CreateArticle username={username}/>
        }
      </UserContext.Consumer>
    </section>
  );
}
 
export default CreateArticles;