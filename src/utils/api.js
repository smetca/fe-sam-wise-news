import axios from 'axios';

const request = axios.create({baseURL:'https://sam-wise-news.herokuapp.com/api'})

export const getArticles = async () => {
  const response = await request.get('/articles');
  return response.data.articles;
}

export const getArticle = async (article_id) => {
  const response = await request.get(`/articles/${article_id}`)
  return response.data.article;
}

export const getArticleComments = async (article_id) => {
  const response = await request.get(`/articles/${article_id}/comments`)
  console.log(response.data)
  return response.data.comments;
}

export const updateVote = async (vote, article_id) => {
  const response = await request.patch(`/articles/${article_id}`, vote);
  return response.data.article;
}