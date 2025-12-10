import { useEffect, useState } from "react";
import { todoService } from "../../services/todoService";
import { Link } from "react-router-dom";
import AdminPremium from "../AdminPremium";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(currentUser);
    
    const loadTodos = () => {
      const userKey = currentUser.email || 'default';
      const savedTodos = JSON.parse(localStorage.getItem(`todos_${userKey}`) || '[]');
      setTodos(savedTodos);
      setLoading(false);
    };
    
    loadTodos();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadTodos();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Debug user
  console.log('Current user:', user);
  
  // Jika admin, langsung tampilkan AdminPremium
  if (user?.role === 'admin' || user?.email === 'adinadmin@gmail.com') {
    return <AdminPremium />;
  }

  // Loading state
  if (!user || !user.email) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 py-6 px-6 rounded-xl shadow-lg">
        <h1 className="font-bold text-3xl text-white drop-shadow-lg">📊 Dashboard</h1>
        <p className="text-white/90 text-sm mt-1">Selamat datang kembali!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link
          to="/todo-list"
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-yellow-400"
          data-aos="fade-up"
        >
          <h2 className="text-white text-lg mb-3 font-semibold">📝 Total Todos</h2>
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-400"></div>
            </div>
          ) : (
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {todos.length}
            </p>
          )}
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
