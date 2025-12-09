import { useEffect, useState } from "react";
import { todoService } from "../../services/todoService";
import { Link, useNavigate } from "react-router-dom";
import AuthController from "../../controllers/AuthController";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = AuthController();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect admin to admin panel
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/premium');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todoService.getAll();
        setTodos(data);
      } catch (err) {
        console.error("Gagal ambil data todos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

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
