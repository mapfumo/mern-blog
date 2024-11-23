import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getPosts = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
};

export const getPost = async (id) => {
  const response = await axios.get(`${BASE_URL}/posts/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
};

export const createPost = async (post) => {
  const response = await axios.post(`${BASE_URL}/posts`, post);
  return response;
};

export const updatePost = async (id, post) => {
  const response = await axios.put(`${BASE_URL}/posts/${id}`, post);
  return response;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${BASE_URL}/posts/${id}`);
  return response;
};
///////////////////////////////////////////////////////////////////////////
export const getUser = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
};

export const createUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/users`, user);
  return response;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, user);
  return response;
};

export async function verifyUser(user) {
  const response = await axios.post(`${BASE_URL}/users/login`, user);

  if (response.data.success) {
    // return response.data.user;
    return response.data.token;
  } else {
    return;
  }
}
