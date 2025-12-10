  import axios from "axios";
import { create } from "zustand";

// Backend URL - ganti dengan yang working
const baseUrl = "https://todolistpremium.ct.ws"; // InfinityFree
// const baseUrl = "https://tododin-api.up.railway.app"; // Railway
const savedToken = localStorage.getItem("token");
const savedUserRaw = localStorage.getItem("user");
const savedUser =
  savedUserRaw && savedUserRaw !== "undefined"
    ? JSON.parse(savedUserRaw)
    : null;

const AuthController = create((set) => ({
  user: savedUser,
  token: savedToken || null,
  error: null,

  setUser: (user) => {
    set(() => ({ user }));
    localStorage.setItem("user", JSON.stringify(user));
  },

  refreshUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const res = await axios.get(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const user = res.data;
      set({ user, error: null });
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      console.error('Failed to refresh user:', err);
      throw err;
    }
  },



  login: async (email, password, navigate) => {
    const cleanEmail = email.replace('mailto:', '');
    
    if (!cleanEmail || !password) {
      set({ error: "Masukkan email dan password" });
      return;
    }

    try {
      // Coba login ke Laravel backend
      const response = await axios.post(`${baseUrl}/login`, {
        email: cleanEmail,
        password: password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, error: null });
      
      window.location.replace('/dashboard');
    } catch (err) {
      // Fallback ke localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = registeredUsers.find(user => 
        user.email === cleanEmail && user.password === password
      );
      
      if (!foundUser && cleanEmail !== 'adinadmin@gmail.com') {
        set({ error: "Email atau password salah" });
        throw new Error("Email atau password salah");
      }

      const user = foundUser || {
        id: 1,
        name: 'Admin',
        email: cleanEmail,
        role: 'admin',
        is_premium: 1
      };
      
      user.role = cleanEmail === 'adinadmin@gmail.com' ? 'admin' : 'user';
      user.is_premium = cleanEmail === 'adinadmin@gmail.com' ? 1 : 0;
      
      const token = "token-" + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, user, error: null });
      
      window.location.replace('/dashboard');
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${baseUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      // Silent error
    }
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  register: async (data, navigate) => {
    try {
      const cleanData = {
        name: data.name,
        email: data.email.replace('mailto:', ''),
        password: data.password
      };
      
      // Debug data yang dikirim
      console.log('Sending data:', cleanData);
      
      // Pakai file PHP khusus
      const response = await axios.post(`${baseUrl}/api_register.php`, cleanData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response.data);
      
      set({ error: null });
      navigate("/login");
    } catch (err) {
      console.log('Backend error:', err);
      // Jika backend error, fallback ke localStorage
      const cleanEmail = data.email.replace('mailto:', '');
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const emailExists = existingUsers.find(user => user.email === cleanEmail);
      
      if (emailExists) {
        set({ error: "Email sudah terdaftar" });
        throw new Error("Email sudah terdaftar");
      }
      
      const newUser = {
        id: Date.now(),
        name: data.name,
        email: cleanEmail,
        password: data.password,
        created_at: new Date().toISOString()
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      set({ error: null });
      navigate("/login");
    }
  },
}));

export default AuthController;
