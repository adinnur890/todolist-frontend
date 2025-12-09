import axios from "axios";
import { create } from "zustand";

const api = "http://localhost:8000/api";

const handleUnauthorized = (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  throw error;
};

const SubtaskController = create((set) => ({
  subtasks: [],
  error: null,
  success: null,

  getSubtasks: async (todoId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${api}/subtasks?todo_id=${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        subtasks: res.data,
        error: null,
      });

      return res.data; 
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Gagal memuat subtask";
      set({ error: message });
      throw new Error(message);
    }
  },

  createSubtask: async (todoId, data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${api}/subtasks?todo_id=${todoId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        subtasks: [...state.subtasks, res.data],
        success: "Subtask berhasil ditambahkan",
        error: null,
      }));
    } catch (err) {
      handleUnauthorized(err);
      const message =
        err.response?.data?.message || "Gagal menambahkan subtask";
      set({ error: message });
      throw err;
    }
  },

  updateSubtask: async (id, data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(`${api}/subtasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        subtasks: state.subtasks.map((item) =>
          item.id === id ? res.data : item
        ),
        success: "Subtask berhasil diupdate",
        error: null,
      }));
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Gagal mengupdate subtask";
      set({ error: message });
      throw err;
    }
  },

  deleteSubtask: async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${api}/subtasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        subtasks: state.subtasks.filter((item) => item.id !== id),
        success: "Subtask berhasil dihapus",
        error: null,
      }));
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Gagal menghapus subtask";
      set({ error: message });
      throw err;
    }
  },

  changeStatus: async (subtaskId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${api}/subtasks/change-status`,
        {
          subtask_id: subtaskId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        subtasks: state.subtasks.map((item) =>
          item.id === subtaskId ? { ...item, status } : item
        ),
        success: "Status berhasil diperbarui",
        error: null,
      }));
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Gagal memperbarui status";
      set({ error: message });
      throw err;
    }
  },

  clearMessage: () => set({ error: null, success: null }),
}));

export default SubtaskController;
