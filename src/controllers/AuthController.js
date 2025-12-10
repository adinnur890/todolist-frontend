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
      throw new Error("Masukkan email dan password");
    }

    // Langsung pakai localStorage, skip backend
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = registeredUsers.find(user => 
      user.email === cleanEmail && user.password === password
    );
    
    // Special case untuk admin
    if (cleanEmail === 'adinadmin@gmail.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin',
        email: cleanEmail,
        role: 'admin',
        is_premium: true
      };
      
      const token = "admin-token-" + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(adminUser));
      set({ token, user: adminUser, error: null });
      
      navigate('/dashboard');
      return;
    }
    
    if (!foundUser) {
      set({ error: "Email atau password salah" });
      throw new Error("Email atau password salah");
    }

    // Check premium status and expiry
    let user = { ...foundUser };
    if (foundUser.premium_expires_at) {
      const expiryDate = new Date(foundUser.premium_expires_at);
      const now = new Date();
      user.is_premium = expiryDate > now;
      
      // If expired, update in localStorage
      if (expiryDate <= now && foundUser.is_premium) {
        const userIndex = registeredUsers.findIndex(u => u.email === cleanEmail);
        if (userIndex !== -1) {
          registeredUsers[userIndex].is_premium = false;
          localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
          user.is_premium = false;
        }
      }
    }
    
    const token = "user-token-" + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, error: null });
    
    navigate('/dashboard');
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
    // Clear global todos and subtasks on logout (keep per-user data)
    localStorage.removeItem('todos');
    localStorage.removeItem('subtasks');
  },

  register: async (data, navigate) => {
    try {
      // Debug data mentah
      console.log('Raw data from form:', data);
      
      const cleanData = {
        name: data.name || 'Unknown',
        email: data.email ? data.email.replace('mailto:', '') : '',
        password: data.password || ''
      };
      
      console.log('Clean data to send:', cleanData);
      
      // Kirim dengan FormData
      const formData = new FormData();
      formData.append('name', cleanData.name);
      formData.append('email', cleanData.email);
      formData.append('password', cleanData.password);
      
      const response = await axios.post(`${baseUrl}/api_register.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
        role: 'user',
        is_premium: false,
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
