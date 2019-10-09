import axios from 'axios';

const request = axios.create({baseURL:'https://sam-wise-news.herokuapp.com/api'})

export const getArticles = async (filters) => {
  const response = await request.get('/articles', {
    params: filters
  });
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