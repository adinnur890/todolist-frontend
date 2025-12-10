  import axios from "axios";
import { create } from "zustand";

const baseUrl = "https://todolistpremium.ct.ws/backend_tododin/public/api";
const savedToken = localStorage.getItem("token");
const savedUserRaw = localStorage.getItem("user");
const savedUser =
  savedUserRaw && savedUserRaw !== "undefined"
    ? JSON.parse(savedUserRaw)
    : null;

const AuthController = create((set) => ({
  user: savedUser,
  token: savedToken || null,
  error: null,

  setUser: (user) => {
    set(() => ({ user }));
    localStorage.setItem("user", JSON.stringify(user));
  },

  refreshUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const res = await axios.get(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const user = res.data;
      set({ user, error: null });
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      console.error('Failed to refresh user:', err);
      throw err;
    }
  },



  login: async (email, password, navigate) => {
    try {
      const cleanEmail = email.replace('mailto:', '');
      
      const res = await axios.post(`${baseUrl}/login`, {
        email: cleanEmail,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const { token, user } = res.data;
      set({ token, user, error: null });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/todo-list");
    } catch (err) {
      console.error('Login error:', err.response?.data);
      const errorMsg = err.response?.data?.message || "Login failed";
      set({ error: errorMsg });
      throw err;
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${baseUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      // Silent error
    }
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  register: async (data, navigate) => {
    try {
      const cleanData = {
        ...data,
        email: data.email.replace('mailto:', '')
      };
      
      await axios.post(`${baseUrl}/register`, cleanData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      set({ error: null });
      navigate("/login");
    } catch (err) {
      console.error('Register error:', err.response?.data);
      const errorMsg = err.response?.data?.message || "Registration failed";
      set({ error: errorMsg });
      throw err;
    }
  },
}));

export default AuthController;
