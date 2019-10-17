import axios from 'axios';

const request = axios.create({baseURL:'https://sam-wise-news.herokuapp.com/api'})

export const getArticles = async (filters) => {
  const response = await request.get('/articles', {
    params: filters
  });
  return response.data;
}

export const getArticle = async (article_id) => {
  const response = await request.get(`/articles/${article_id}`)
  return response.data.article;
}

export const getArticleComments = async (article_id, filters) => {
  const response = await request.get(`/articles/${article_id}/comments`, {
    params: filters
  })
  return response.data.comments;
}

export const updateVote = async (vote, id, type) => {
  const response = type === 'comment'
    ? await request.patch(`/comments/${id}`, vote)
    : await request.patch(`/articles/${id}`, vote);
  return response.data.article;
}

export const postComment = async (id, comment) => {
  const response = await request.post(`/articles/${id}/comments`, {
    ...comment
  })
  return response.data.comment;
}

export const deleteComment = async (id) => {
  const response = await request.delete(`/comments/${id}`);
  return response.status;
}

export const getUsers = async () => {
  const response = await request.get('/users');
  return response.data.users;
}

export const getUser = async (username) => {
  const response = await request.get(`/users/${username}`);
  return response.data.user;
}

export const postArticle = async ({title, body, author, topic}) => {
  const response = await request.post('/articles', {
    title,
    body,
    author,
    topic
  });
  return response.data.article;
}