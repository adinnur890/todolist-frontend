import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = AuthController((state) => state.login);
  const { error } = AuthController();
  const navigate = useNavigate();





  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Form Tidak Lengkap",
        text: "Mohon isi email dan password"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await login(email, password, navigate);
    } catch (err) {
      console.error('Login error:', err);
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: err.message || "Email atau password salah"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 animate-gradient flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-gray-900/80 backdrop-blur-xl shadow-2xl w-full max-w-5xl grid md:grid-cols-2 grid-cols-1 rounded-3xl border border-gray-800 overflow-hidden animate-fadeInScale">
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-l-3xl justify-center items-center hidden md:flex p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 animate-shimmer"></div>
          <div className="relative z-10 text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/30">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <Link to="/" className="block">
              <h1 className="text-6xl text-white font-extrabold drop-shadow-lg hover:scale-105 transition-transform duration-300">TodoDin</h1>
              <p className="text-white/90 text-lg mt-3">Kelola tugas dengan mudah</p>
            </Link>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="py-12 px-8 md:px-12">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="font-extrabold text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Selamat Datang</h2>
            <p className="text-gray-400 mt-2">Masuk ke akun Anda</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="animate-fadeInUp delay-100">
              <label className="text-gray-300 font-medium flex items-center space-x-2 mb-2">
                <i className="fa-solid fa-envelope text-purple-400"></i>
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>

            <div className="animate-fadeInUp delay-200">
              <label className="text-gray-300 font-medium flex items-center space-x-2 mb-2">
                <i className="fa-solid fa-lock text-purple-400"></i>
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm animate-fadeInUp">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-200 animate-fadeInUp delay-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                  <span>Memproses...</span>
                </div>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket mr-2"></i>
                  Login
                </>
              )}
            </button>

            <div className="text-center pt-2 animate-fadeInUp delay-400">
              <p className="text-gray-400">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-purple-400 hover:text-pink-400 font-semibold transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
