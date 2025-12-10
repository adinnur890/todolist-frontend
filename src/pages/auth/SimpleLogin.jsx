import { useState } from "react";
import { Link } from "react-router-dom";

function SimpleLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Masukkan email dan password");
      return;
    }

    // Simpan token
    localStorage.setItem('token', 'demo-token-123');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: email.split('@')[0],
      email: email,
      role: email === 'adinadmin@gmail.com' ? 'admin' : 'user'
    }));

    // Redirect
    if (email === 'adinadmin@gmail.com') {
      window.location.href = '/admin/premium';
    } else {
      window.location.href = '/todo-list';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h2 className="text-white text-2xl mb-6 text-center">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded"
            required
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        
        <p className="text-gray-400 text-center mt-4">
          Belum punya akun? <Link to="/register" className="text-blue-400">Daftar</Link>
        </p>
      </div>
    </div>
  );
}

export default SimpleLogin;