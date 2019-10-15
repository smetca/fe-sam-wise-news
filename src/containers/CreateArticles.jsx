import React from 'react';
import CreateArticle from '../components/CreateArticle';

const CreateArticles = ({username}) => {
  return (
    <section>
      <h2>Create an Article!</h2>
      <CreateArticle username={username}/>
    </section>
  );
}
 
export default CreateArticles;