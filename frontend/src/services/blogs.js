import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then(
    response => response.data
  );
};

const create = async newBlog => {

  const config = {
    headers:
        {
          Authorization: token
        }
  };

  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const deleteBlog = async blog => {

  const config = {
    headers:
        {
          Authorization: token
        }
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);

  return response.data;
};

const likeBlog = async blog => {

  const config = {
    headers:
        {
          Authorization: token
        }
  };

  const updatedBlog = {
    user:blog.user,
    likes:blog.likes+1,
    author:blog.author,
    title:blog.title,
    url:blog.url
  };


  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config);

  return response.data;
};

export default { getAll, setToken, create, likeBlog, deleteBlog };