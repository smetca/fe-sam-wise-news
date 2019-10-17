import React from 'react';
import CreateArticle from '../components/CreateArticle';
import UserContext from '../components/UserContext';

const CreateArticles = () => {
  return (
    <section>
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