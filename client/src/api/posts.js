import api from "./axios";

const endPoint = "/api/posts";

export const getAllPosts = async () => {
  try {
    const res = await api.get(`${endPoint}/`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
};

export const getAllFound = async () => {
  try {
    const res = await api.get(`${endPoint}/found`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
};

export const getAllLost = async () => {
  try {
    const res = await api.get(`${endPoint}/lost`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
};

export const getPostById = async (id) => {
  try {
    const res = await api.get(`${endPoint}/${id}`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
};

export const verifyPassword = async (id, data) => {
  try {
    const res = await api.post(`${endPoint}/verify/${id}`, data);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status
    };
  }
};

export const createPost = async (data) => {
  try {
    const res = await api.post(`${endPoint}/`, data);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
};

export const editPost = async (id, data) => {
  try {
    const res = await api.put(`${endPoint}/${id}`, data);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
};

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`${endPoint}/${id}`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status
    };
  }
};
