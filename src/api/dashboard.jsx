import axios from 'axios';

export const getUsersCount = async () => {
  const res = await axios.get('/api/users/count');
  return res.data.count;
};

export const getNewsCount = async () => {
  const res = await axios.get('/api/news/count');
  return res.data.count;
};

export const getArticlesCount = async () => {
  const res = await axios.get('/api/articles/count');
  return res.data.count;
};

export const getBlogsCount = async () => {
  const res = await axios.get('/api/blogs/count');
  return res.data.count;
};
