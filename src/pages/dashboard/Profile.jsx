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
  const [avatarPreview, setAvatarPreview] = useState("https://via.placeholder.com/300x300/374151/ffffff?text=👤");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
      // Load avatar per-user
      const userKey = user.email || 'default';
      const savedAvatar = localStorage.getItem(`avatar_${userKey}`);
      if (savedAvatar) {
        setAvatarPreview(savedAvatar);
      }
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      
      // Compress and convert to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Resize to max 300x300 for faster loading
        const maxSize = 300;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
        setAvatarPreview(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password && form.password.length < 6) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Validasi Gagal",
        text: "Password minimal 6 karakter",
      });
      return;
    }

    setTimeout(() => {
      // Update user data
      const updatedUser = {
        ...user,
        name: form.name,
        email: form.email,
      };
      
      if (avatar) {
        // Simpan avatar per-user
        const userKey = user.email || 'default';
        localStorage.setItem(`avatar_${userKey}`, avatarPreview);
      }
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setForm({ ...form, password: "" });
      setAvatar(null);
      setLoading(false);
      
      // Trigger sidebar update
      window.dispatchEvent(new Event('storage'));
      
      // Success message
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        timer: 800,
        showConfirmButton: false
      });
    }, 200);
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
                <div 
                  className="flex items-center justify-center rounded-xl h-56 w-full shadow-2xl border-4 border-gray-700 bg-gradient-to-br from-gray-600 to-gray-700 text-8xl"
                  style={{
                    backgroundImage: avatarPreview && (avatarPreview.startsWith('data:') || avatarPreview.startsWith('blob:') || avatarPreview.startsWith('http')) ? `url(${avatarPreview})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {(!avatarPreview || (!avatarPreview.startsWith('data:') && !avatarPreview.startsWith('blob:') && !avatarPreview.startsWith('http'))) && '👤'}
                </div>
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
