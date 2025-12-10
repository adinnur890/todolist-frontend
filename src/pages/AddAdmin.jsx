import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' });

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      Swal.fire({
        icon: 'error',
        title: 'Form Tidak Lengkap',
        text: 'Semua field harus diisi'
      });
      return;
    }
    
    try {
      setLoading(true);
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Check if email already exists
      const emailExists = registeredUsers.find(u => u.email === adminForm.email);
      if (emailExists) {
        Swal.fire({
          icon: 'error',
          title: 'Email Sudah Terdaftar',
          text: 'Email sudah digunakan oleh user lain'
        });
        setLoading(false);
        return;
      }
      
      const newAdmin = {
        id: Date.now(),
        name: adminForm.name,
        email: adminForm.email,
        password: adminForm.password,
        role: 'admin',
        is_premium: true,
        created_at: new Date().toISOString()
      };
      
      registeredUsers.push(newAdmin);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Admin ${adminForm.email} berhasil ditambahkan!`,
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/dashboard');
      });
      
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: `Gagal menambah admin: ${err.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-2xl mb-4">
            <span className="text-3xl">👤</span>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-2">
            Tambah Admin Baru
          </h1>
          <p className="text-gray-300">Buat akun admin baru untuk sistem</p>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-red-500/30">
          <form onSubmit={handleAddAdmin} className="space-y-6">
            <div>
              <label className="block text-red-300 font-semibold mb-2">
                <i className="fas fa-user mr-2"></i>
                Nama Lengkap
              </label>
              <input
                type="text"
                value={adminForm.name}
                onChange={(e) => setAdminForm({...adminForm, name: e.target.value})}
                className="w-full bg-gray-800/50 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none transition-all"
                placeholder="Nama admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-red-300 font-semibold mb-2">
                <i className="fas fa-envelope mr-2"></i>
                Email
              </label>
              <input
                type="email"
                value={adminForm.email}
                onChange={(e) => setAdminForm({...adminForm, email: e.target.value})}
                className="w-full bg-gray-800/50 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-red-300 font-semibold mb-2">
                <i className="fas fa-lock mr-2"></i>
                Password
              </label>
              <input
                type="password"
                value={adminForm.password}
                onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                className="w-full bg-gray-800/50 border border-red-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none transition-all"
                placeholder="Password admin"
                required
              />
            </div>
            
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold transition-all"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Kembali
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i>
                    Tambah Admin
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;