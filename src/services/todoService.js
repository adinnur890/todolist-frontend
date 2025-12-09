import axios from "axios";

const API_URL = "http://localhost:8000/api/todos";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

const handleUnauthorized = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  throw error;
};

export const todoService = {
  getAll: async () => {
    try {
      const { data } = await axios.get(API_URL, {
        headers: getAuthHeader(),
      });
      return data;
    } catch (error) {
      handleUnauthorized(error);
    }
  },

  create: async (todo) => {
    try {
      const { data } = await axios.post(API_URL, todo, {
        headers: getAuthHeader(),
      });
      return data;
    } catch (error) {
      handleUnauthorized(error);
    }
  },

  update: async (id, todo) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, todo, {
        headers: getAuthHeader(),
      });
      return data;
    } catch (error) {
      handleUnauthorized(error);
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeader(),
      });
    } catch (error) {
      handleUnauthorized(error);
    }
  },
};
