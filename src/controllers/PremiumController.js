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

const PremiumController = create((set) => ({
  packages: [],
  subscription: null,
  voucher: null,
  error: null,
  success: null,

  getPackages: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${api}/premium/packages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ packages: res.data, error: null });
      return res.data;
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Gagal memuat paket";
      set({ error: message });
      throw err;
    }
  },

  validateVoucher: async (code, planId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${api}/voucher/validate`, {
        code, plan_id: planId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Backend returns { voucher: {...}, original_price, discount, final_price }
      set({ voucher: res.data.voucher || res.data, error: null });
      return res.data;
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Voucher tidak valid";
      set({ error: message, voucher: null });
      throw err;
    }
  },

  purchasePremium: async (planId, voucherCode = null) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${api}/premium/purchase`, {
        plan_id: planId,
        voucher_code: voucherCode
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ success: "Premium berhasil dibeli!", error: null });
      return res.data;
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Gagal membeli premium";
      set({ error: message });
      throw err;
    }
  },

  getSubscription: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${api}/user/subscription`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ subscription: res.data, error: null });
      return res.data;
    } catch (err) {
      handleUnauthorized(err);
      const message = err.response?.data?.message || "Gagal memuat subscription";
      set({ error: message });
      throw err;
    }
  },

  clearMessage: () => set({ error: null, success: null }),
  clearVoucher: () => set({ voucher: null })
}));

export default PremiumController;