import axios from "axios";
import { create } from "zustand";

const api = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const VoucherController = create((set) => ({
  voucher: null,
  error: null,

  checkVoucher: async (code, planId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${api}/vouchers/check`,
        { code, plan_id: planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ voucher: res.data.voucher, error: null });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Voucher tidak valid";
      set({ error: message, voucher: null });
      throw err;
    }
  },

  redeemVoucher: async (code) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${api}/vouchers/redeem`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ error: null });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Gagal redeem voucher";
      set({ error: message });
      throw err;
    }
  },

  clearVoucher: () => set({ voucher: null, error: null }),
}));

export default VoucherController;
