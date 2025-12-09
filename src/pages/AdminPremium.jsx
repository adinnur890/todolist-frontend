import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthController from '../controllers/AuthController';

const AdminPremium = () => {
  const navigate = useNavigate();
  const { user } = AuthController();
  const [userEmail, setUserEmail] = useState('');
  const [planId, setPlanId] = useState('1');
  const [voucherCode, setVoucherCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [premiumCount, setPremiumCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Fetch premium users count
  const fetchPremiumCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/api/admin/premium-count', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPremiumCount(res.data.count || 0);
      console.log('Premium stats:', res.data);
    } catch (err) {
      console.error('Failed to fetch premium count:', err);
      setPremiumCount(0);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setUsers([]);
    }
  };

  // Quick activate premium
  const quickActivatePremium = async (userEmail, planId = 1) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/admin/activate-premium', {
        user_email: userEmail,
        plan_id: planId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage(`✅ Premium berhasil diaktifkan untuk ${userEmail}!`);
      fetchUsers();
      fetchPremiumCount();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal mengaktifkan premium';
      setError(`❌ ${errorMsg}`);
    }
  };

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'admin') {
      setError('❌ Akses ditolak. Halaman ini khusus admin.');
      setTimeout(() => navigate('/dashboard'), 3000);
      return;
    }

    // Fetch data when component loads
    fetchPremiumCount();
    fetchUsers();
  }, [user, navigate]);

  const plans = [
    { id: 1, name: 'Premium 1 Bulan', duration: 1 },
    { id: 2, name: 'Premium 3 Bulan', duration: 3 },
    { id: 3, name: 'Premium 1 Tahun', duration: 12 }
  ];

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!userEmail.trim()) {
      setError('Email user harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8000/api/admin/activate-premium', {
        user_email: userEmail,
        plan_id: parseInt(planId),
        voucher_code: voucherCode || null
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(`✅ Premium berhasil diaktifkan untuk ${userEmail}!`);
      setUserEmail('');
      setVoucherCode('');
      
      // Refresh data after activation
      fetchPremiumCount();
      fetchUsers();
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal mengaktifkan premium';
      setError(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full shadow-2xl mb-6 animate-bounce">
            <span className="text-4xl">👑</span>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4">
            Admin Control Panel
          </h1>
          <p className="text-gray-300 text-xl">✨ Kelola Premium User dengan Mudah ✨</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Form */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-500/30">

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-sm">🚀</span>
              Aktivasi Premium
            </h2>

            {message && (
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-400 text-green-300 px-6 py-4 rounded-2xl mb-6 backdrop-blur-sm animate-pulse">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <span className="font-semibold">{message}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-400 text-red-300 px-6 py-4 rounded-2xl mb-6 backdrop-blur-sm animate-pulse">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <span className="font-semibold">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleActivate} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                  <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xs">📧</span>
                  Email User
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-gray-800/50 border-2 border-purple-500/30 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                  <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-xs">📦</span>
                  Paket Premium
                </label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="w-full bg-gray-800/50 border-2 border-purple-500/30 rounded-2xl px-6 py-4 text-white focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id} className="bg-gray-800">
                      {plan.name} ({plan.duration} bulan)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                  <span className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-xs">🎫</span>
                  Kode Voucher (opsional)
                </label>
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  placeholder="DISKON50, HEMAT20K, GRATIS100"
                  className="w-full bg-gray-800/50 border-2 border-purple-500/30 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white py-5 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <span>Aktivasi Premium Sekarang</span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-sm">📊</span>
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">{premiumCount}</div>
                  <div className="text-sm text-gray-300">Premium Users</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-sm text-gray-300">Support Active</div>
                </div>
              </div>
            </div>

            {/* Available Vouchers */}
            <div className="bg-gradient-to-br from-pink-800/40 to-rose-800/40 backdrop-blur-xl rounded-3xl p-6 border border-pink-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-sm">🎫</span>
                Voucher Aktif
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-3 border border-yellow-500/30">
                  <div className="font-semibold text-yellow-400">DISKON50</div>
                  <div className="text-xs text-gray-300">Diskon 50%</div>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-3 border border-green-500/30">
                  <div className="font-semibold text-green-400">HEMAT20K</div>
                  <div className="text-xs text-gray-300">Diskon Rp 20.000</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 border border-purple-500/30">
                  <div className="font-semibold text-purple-400">GRATIS100</div>
                  <div className="text-xs text-gray-300">Gratis 100%</div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-indigo-800/40 to-purple-800/40 backdrop-blur-xl rounded-3xl p-6 border border-indigo-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-sm">📋</span>
                Panduan Aktivasi
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
                  <span className="text-gray-300 text-sm">Input email user dari WhatsApp</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
                  <span className="text-gray-300 text-sm">Pilih paket sesuai request user</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
                  <span className="text-gray-300 text-sm">Masukkan voucher jika ada</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">4</span>
                  <span className="text-gray-300 text-sm">Klik aktivasi & user jadi premium!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="mt-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-lg">👥</span>
              User Management
            </h2>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="🔍 Cari user by email atau nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800/50 border-2 border-purple-500/30 rounded-2xl px-6 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-300"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-800/50 border-2 border-purple-500/30 rounded-2xl px-6 py-3 text-white focus:border-purple-400 focus:outline-none transition-all duration-300"
              >
                <option value="all">Semua Status</option>
                <option value="premium">👑 Premium</option>
                <option value="free">🆓 Free</option>
                <option value="expired">⏰ Expired</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">User</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Expired Date</th>
                    <th className="text-left py-4 px-4 text-purple-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(user => {
                      // Exclude admin users
                      if (user.role === 'admin') return false;
                      
                      const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
                      
                      if (statusFilter === 'all') return matchesSearch;
                      if (statusFilter === 'premium') return matchesSearch && user.is_premium;
                      if (statusFilter === 'free') return matchesSearch && !user.is_premium;
                      if (statusFilter === 'expired') {
                        return matchesSearch && user.is_premium && user.premium_expires_at && 
                               new Date(user.premium_expires_at) < new Date();
                      }
                      return matchesSearch;
                    })
                    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
                    .map((user, index) => {
                      const isExpired = user.premium_expires_at && new Date(user.premium_expires_at) < new Date();
                      const isAdmin = user.role === 'admin';
                      
                      return (
                        <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                                isAdmin ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                user.is_premium ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                'bg-gradient-to-r from-gray-500 to-gray-600'
                              }`}>
                                {isAdmin ? '🔥' : user.is_premium ? '👑' : '👤'}
                              </div>
                              <div>
                                <div className="text-white font-semibold">{user.name}</div>
                                <div className="text-gray-400 text-sm">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                              isAdmin ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              user.is_premium ? 
                                (isExpired ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                           'bg-green-500/20 text-green-400 border border-green-500/30') :
                              'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                              {isAdmin ? '🔥 Admin' :
                               user.is_premium ? 
                                 (isExpired ? '⏰ Expired' : '👑 Premium') :
                               '🆓 Free'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-gray-300">
                              {user.premium_expires_at ? 
                                new Date(user.premium_expires_at).toLocaleDateString('id-ID') : 
                                '-'
                              }
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {!user.is_premium && !isAdmin && (
                                <button
                                  onClick={() => quickActivatePremium(user.email, 1)}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                                  title="Aktivasi Premium 1 Bulan"
                                >
                                  ⚡ Aktivasi
                                </button>
                              )}
                              {isExpired && (
                                <button
                                  onClick={() => quickActivatePremium(user.email, 1)}
                                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                                  title="Perpanjang Premium"
                                >
                                  🔄 Perpanjang
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setUserEmail(user.email);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                                title="Edit di Form"
                              >
                                ✏️ Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-700">
              <div className="text-gray-400 text-sm">
                Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, users.length)} of {users.length} users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  ← Previous
                </button>
                <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-xl border border-purple-500/30">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage * usersPerPage >= users.length}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPremium;