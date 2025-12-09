import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthController from "../../controllers/AuthController";

function Profile() {
  const user = AuthController((state) => state.user);
  const setUser = AuthController((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/src/assets/profile-default.png");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
      if (user.avatar) {
        setAvatarPreview(`http://localhost:8000/storage/${user.avatar}`);
      }
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Validasi Gagal",
        text: "Password minimal 6 karakter",
      });
      return;
    }

    Swal.fire({
      title: "Menyimpan...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (form.password) {
        formData.append("password", form.password);
      }
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const { data } = await axios.post(
        "http://localhost:8000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setForm({ ...form, password: "" });
      setAvatar(null);
      if (data.avatar) {
        setAvatarPreview(`http://localhost:8000/storage/${data.avatar}`);
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Profile berhasil diperbarui",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || err.response?.data?.error || "Terjadi kesalahan, coba lagi nanti",
      });
    }
  };



  return (
    <>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 py-6 px-6 rounded-xl shadow-lg">
        <h1 className="font-bold text-3xl text-white drop-shadow-lg">👤 My Profile</h1>
        <p className="text-white/90 text-sm mt-1">Kelola informasi akun Anda</p>
      </div>

      <div className="grid xl:grid-cols-3 grid-cols-1">
        <div
          className="bg-gradient-to-br from-gray-800 to-gray-900 mb-6 py-6 px-6 rounded-xl min-h-[300px] shadow-xl border border-gray-700"
          data-aos="fade-up"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4 relative">
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="object-cover rounded-xl h-56 w-full shadow-2xl border-4 border-gray-700"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  {user?.is_premium ? "👑 Premium" : "🆓 Gratis"}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold text-sm">👤 Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold text-sm">✉️ Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold text-sm">🔒 Password (optional)</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  minLength={6}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold text-sm">🖼️ Avatar</label>
                <input
                  type="file"
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-white file:font-semibold hover:file:bg-yellow-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold transition-all px-6 py-3 rounded-xl w-full shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                ✔️ Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
