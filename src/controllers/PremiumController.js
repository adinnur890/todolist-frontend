import axios from "axios";
import { create } from "zustand";

const api = "https://todolistpremium.ct.ws/backend_tododin/public/api";

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
      // Fallback data jika backend tidak tersedia
      const fallbackPackages = [
        {
          id: 1,
          name: "Premium 1 Bulan",
          price: 50000,
          duration_months: 1,
          description: "Akses premium selama 1 bulan"
        },
        {
          id: 2,
          name: "Premium 3 Bulan",
          price: 120000,
          duration_months: 3,
          description: "Akses premium selama 3 bulan - Hemat 20%"
        },
        {
          id: 3,
          name: "Premium 1 Tahun",
          price: 400000,
          duration_months: 12,
          description: "Akses premium selama 1 tahun - Hemat 40%"
        }
      ];
      
      set({ packages: fallbackPackages, error: null });
      return fallbackPackages;
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
      set({ voucher: res.data.voucher || res.data, error: null });
      return res.data;
    } catch (err) {
      // Fallback voucher system
      const voucherData = {
        // Paket 1 Bulan (50k)
        1: {
          'HEMAT10K': { discount_type: 'fixed', discount_value: 10000 },
          'DISKON20': { discount_type: 'percentage', discount_value: 20 },
          'GRATIS100': { discount_type: 'percentage', discount_value: 100 }
        },
        // Paket 3 Bulan (120k)
        2: {
          'HEMAT30K': { discount_type: 'fixed', discount_value: 30000 },
          'DISKON25': { discount_type: 'percentage', discount_value: 25 },
          'GRATIS100': { discount_type: 'percentage', discount_value: 100 }
        },
        // Paket 1 Tahun (400k)
        3: {
          'HEMAT100K': { discount_type: 'fixed', discount_value: 100000 },
          'DISKON50': { discount_type: 'percentage', discount_value: 50 },
          'GRATIS100': { discount_type: 'percentage', discount_value: 100 }
        }
      };
      
      const packageVouchers = voucherData[planId];
      if (!packageVouchers || !packageVouchers[code]) {
        const message = packageVouchers ? "Voucher tidak valid" : "Voucher ini tidak berlaku untuk paket yang dipilih";
        set({ error: message, voucher: null });
        throw new Error(message);
      }
      
      const voucher = packageVouchers[code];
      set({ voucher, error: null });
      return { voucher };
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