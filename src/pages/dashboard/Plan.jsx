// src/pages/Plans.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://localhost:8000/api";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);

  const checkVoucher = async (planId, code) => {
    if (!code) {
      setVoucher(null);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseUrl}/vouchers/check`,
        { code, plan_id: planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVoucher(res.data.voucher);
      setFinalPrice(res.data.final_price);
      Swal.fire({
        icon: "success",
        title: "Voucher Valid!",
        text: res.data.message,
        timer: 2000,
      });
    } catch (err) {
      setVoucher(null);
      Swal.fire({
        icon: "error",
        title: "Voucher Tidak Valid",
        text: err.response?.data?.message || "Kode voucher salah",
      });
    }
  };

  const handleBuyPremium = (plan) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const phoneNumber = "628979045222";
    const price = voucher ? finalPrice : plan.price;
    const discount = voucher ? plan.price - finalPrice : 0;
    
    const message = encodeURIComponent(
      `Halo, saya ingin upgrade ke Premium TodoList\n\n` +
      `Paket: ${plan.name}\n` +
      `Harga Normal: Rp ${plan.price.toLocaleString()}\n` +
      (voucher ? `Kode Voucher: ${voucherCode}\n` : "") +
      (voucher ? `Diskon: Rp ${discount.toLocaleString()}\n` : "") +
      `Harga Bayar: Rp ${price.toLocaleString()}\n\n` +
      `Data Akun:\n` +
      `Nama: ${user.name || "-"}\n` +
      `Email: ${user.email || "-"}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/plans`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(res.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal mengambil data paket premium",
        });
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Pilih Paket Premium</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-gray-900 text-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-gray-300 mb-4">{plan.description}</p>
            
            {selectedPlan === plan.id && voucher ? (
              <div className="mb-4">
                <p className="text-gray-400 line-through text-sm">
                  Rp {plan.price.toLocaleString()}
                </p>
                <p className="text-green-400 text-lg font-bold">
                  Rp {finalPrice.toLocaleString()}
                </p>
                <p className="text-xs text-green-300">
                  Hemat Rp {(plan.price - finalPrice).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-yellow-400 text-lg font-bold mb-4">
                Rp {plan.price.toLocaleString()}
              </p>
            )}

            <div className="mb-4">
              <input
                type="text"
                placeholder="Kode Voucher (opsional)"
                value={selectedPlan === plan.id ? voucherCode : ""}
                onChange={(e) => {
                  setSelectedPlan(plan.id);
                  setVoucherCode(e.target.value.toUpperCase());
                }}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded mb-2"
              />
              {selectedPlan === plan.id && voucherCode && (
                <button
                  onClick={() => checkVoucher(plan.id, voucherCode)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Cek Voucher
                </button>
              )}
            </div>

            <button
              onClick={() => handleBuyPremium(plan)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded"
            >
              Hubungi Admin
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
