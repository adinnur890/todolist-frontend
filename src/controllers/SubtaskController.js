import axios from "axios";
import { create } from "zustand";

const api = "https://todolistpremium.ct.ws";

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
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userKey = user.email || 'default';
      const savedSubtasks = JSON.parse(localStorage.getItem(`subtasks_${userKey}`) || '[]');
      
      set({
        subtasks: savedSubtasks,
        error: null,
      });

      return savedSubtasks; 
    } catch (err) {
      const message = "Gagal memuat subtask";
      set({ error: message });
      throw new Error(message);
    }
  },

  createSubtask: async (todoId, data) => {
    try {
      // Dummy response - subtask berhasil ditambahkan
      const dummySubtask = {
        id: Date.now(),
        todo_id: todoId,
        title: data.title,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      set((state) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userKey = user.email || 'default';
        const newSubtasks = [...state.subtasks, dummySubtask];
        localStorage.setItem(`subtasks_${userKey}`, JSON.stringify(newSubtasks));
        return {
          subtasks: newSubtasks,
          success: "Subtask berhasil ditambahkan",
          error: null,
        };
      });
    } catch (err) {
      console.error("Subtask error:", err);
      const message = "Gagal menambahkan subtask";
      set({ error: message });
      throw err;
    }
  },

  updateSubtask: async (id, data) => {
    try {
      set((state) => ({
        subtasks: state.subtasks.map((item) =>
          item.id == id ? { ...item, title: data.title } : item
        ),
        success: "Subtask berhasil diupdate",
        error: null,
      }));
    } catch (err) {
      const message = "Gagal mengupdate subtask";
      set({ error: message });
      throw err;
    }
  },

  deleteSubtask: async (id) => {
    try {
      set((state) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userKey = user.email || 'default';
        const newSubtasks = state.subtasks.filter((item) => item.id != id);
        localStorage.setItem(`subtasks_${userKey}`, JSON.stringify(newSubtasks));
        return {
          subtasks: newSubtasks,
          success: "Subtask berhasil dihapus",
          error: null,
        };
      });
    } catch (err) {
      const message = "Gagal menghapus subtask";
      set({ error: message });
      throw err;
    }
  },

  changeStatus: async (subtaskId, status) => {
    try {
      console.log("changeStatus called:", { subtaskId, status });
      // Dummy update status
      set((state) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userKey = user.email || 'default';
        const newSubtasks = state.subtasks.map((item) => {
          return item.id == subtaskId ? { ...item, status } : item;
        });
        localStorage.setItem(`subtasks_${userKey}`, JSON.stringify(newSubtasks));
        return {
          subtasks: newSubtasks,
          success: "Status berhasil diperbarui",
          error: null,
        };
      });
    } catch (err) {
      const message = "Gagal memperbarui status";
      set({ error: message });
      throw err;
    }
  },

  clearMessage: () => set({ error: null, success: null }),
}));

export default SubtaskController;