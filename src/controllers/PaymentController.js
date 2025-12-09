import axios from "axios";
import Swal from "sweetalert2";
import AuthController from "./AuthController";

const baseUrl = "http://localhost:8000/api";

const PaymentController = () => {
  const createOrder = async (planId = 1) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseUrl}/orders`,
        { plan_id: planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.order?.id) {
        throw new Error(res.data.message || "Order tidak valid.");
      }

      return res.data.order;
    } catch (error) {
      throw error;
    }
  };

  const createPayment = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseUrl}/payments`,
        { order_id: orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.payment;
    } catch (err) {
      throw err;
    }
  };

  const payWithMidtrans = async (planId) => {
    try {
      const order = await createOrder(planId);
      const paymentResponse = await createPayment(order.id);

      // Force demo mode untuk development
      // Demo mode - langsung success
      Swal.fire({
        icon: "success",
        title: "Upgrade Berhasil!",
        text: "Akun Anda sekarang Premium. Silakan login ulang.",
      }).then(() => {
        const { logout } = AuthController.getState();
        logout();
        window.location.href = "/login";
      });
      return;

      // Code below untuk production Midtrans (disabled)
      /*
      // Check if demo mode
      if (paymentResponse.is_demo === true || paymentResponse.status === 'success') {
        // Demo mode - langsung success
        Swal.fire({
          icon: "success",
          title: "Upgrade Berhasil!",
          text: "Akun Anda sekarang Premium. Silakan login ulang.",
        }).then(() => {
          const { logout } = AuthController.getState();
          logout();
          window.location.href = "/login";
        });
        return;
      }
      */

      // Production mode - pakai Midtrans
      const snapToken = paymentResponse.snap_token;
      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: (result) => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Pembayaran berhasil. Invoice akan segera didownload!",
            }).then(() => {
              const orderId = result.order_id.split("-")[0];
              window.open(`http://localhost:8000/api/invoice/download/${orderId}`, "_blank");

              const { logout } = AuthController.getState();
              logout();
              window.location.href = "/login";
            });
          },
          onPending: (result) => {
            // Pending payment
          },
          onError: (error) => {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Terjadi kesalahan saat pembayaran.",
            });
          },
          onClose: () => {
            // User closed popup
          },
        });
      } else {
        alert("Midtrans Snap belum diload.");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err?.response?.data?.message || "Gagal memproses pembayaran.",
      });
    }
  };

  return {
    payWithMidtrans,
  };
};

export default PaymentController;
