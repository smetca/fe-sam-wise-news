import axios from 'axios';

export const getArticles = async () => {
  const response = await axios.get('https://sam-wise-news.herokuapp.com/api/articles');
  console.log(response.data);
  return response.data.articles;
} 