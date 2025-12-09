import { useEffect, useState } from "react";
import { todoService } from "../../services/todoService";
import AuthController from "../../controllers/AuthController";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function TodoList() {
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const user = AuthController((state) => state.user);
  const navigate = useNavigate();

  // Redirect admin to admin panel
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/premium');
      return;
    }
  }, [user, navigate]);

  const handleStoreTask = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: editId ? "Menyimpan perubahan..." : "Menyimpan...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      if (editId) {
        await todoService.update(editId, form);
      } else {
        await todoService.create(form);
      }
      await fetchTodos();
      setForm({ title: "", description: "" });
      setEditId(null);
      setModal(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: editId
          ? "Perubahan berhasil disimpan"
          : "Todo berhasil ditambahkan",
      });
    } catch (err) {
      console.error("Error saving todo:", err);
      console.error("Error response:", err.response?.data);
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.error || 
                       "Terjadi kesalahan saat menyimpan task.";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMsg,
      });
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await todoService.getAll();
      setTodos(data);
    } catch (error) {
      console.error("Gagal mengambil todos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    // Cek apakah user premium atau tidak - lebih ketat
    const isPremium = user?.is_premium === true || 
                      user?.is_premium === 1 || 
                      user?.is_premium === "1" ||
                      user?.is_premium === "true";
    
    // Jika bukan premium dan sudah ada 3 todos, tampilkan alert upgrade
    if (!isPremium && todos.length >= 3) {
      Swal.fire({
        title: "Upgrade ke Premium",
        text: "Akun gratis hanya bisa menambahkan 3 todos. Upgrade ke premium untuk unlimited todos!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Lihat Paket Premium",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/plans");
        }
      });
      return;
    }
    
    setForm({ title: "", description: "" });
    setEditId(null);
    setModal(true);
  };

  const openEditModal = async (todo) => {
    setEditId(todo.id);
    setForm({
      title: todo.title,
      description: todo.description,
    });
    setModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data tidak bisa dikembalikan setelah dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Menghapus...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await todoService.delete(id);
        await fetchTodos();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Todo berhasil dihapus.",
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus.",
        });
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 py-6 px-6 rounded-xl shadow-lg">
        <h1 className="font-bold text-3xl text-white drop-shadow-lg">📝 Todo List</h1>
        <p className="text-white/90 text-sm mt-1">Kelola semua tugas Anda dengan mudah</p>
      </div>

      <div className="flex gap-3 items-center mb-6 flex-wrap">
        <button
          className="font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          onClick={() => openAddModal()}
        >
          ➕ Tambah Todo
        </button>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-3 rounded-xl text-white text-sm shadow-md border border-gray-700">
          <span className="font-semibold">{user?.is_premium ? "👑 Premium" : "🆓 Gratis"}</span>
          <span className="mx-2">•</span>
          <span>{todos.length} {user?.is_premium ? "Todos" : "/ 3 Todos"}</span>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6 backdrop-blur">
          <div
            className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <h2 className="text-xl text-white font-bold mb-4">
              {editId ? "Edit Todo" : "Tambah Todo"}
            </h2>
            <form onSubmit={handleStoreTask}>
              <div className="mb-3">
                <label className="block text-white mb-1">Judul</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-white text-white px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-white mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-white text-white px-3 py-2 rounded"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-12 px-6 rounded-xl text-center mt-6 border border-gray-700">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-sm">Sedang memuat data...</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-16 px-6 rounded-xl text-center mt-6 border border-gray-700">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-white text-lg font-semibold mb-2">Belum ada todo</p>
          <p className="text-gray-400 text-sm">Klik tombol "Tambah Todo" untuk memulai</p>
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-yellow-400"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-between items-start mb-3">
                <Link
                  to={`/todo-list-detail/${todo.id}`}
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 transition-all w-full"
                >
                  {todo.title}
                </Link>

                <div className="flex space-x-2">
                  <button
                    className="text-2xl hover:scale-125 transition-transform duration-200"
                    onClick={() => openEditModal(todo)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="text-2xl hover:scale-125 transition-transform duration-200"
                    onClick={() => handleDelete(todo.id)}
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <Link to={`/todo-list-detail/${todo.id}`}>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {todo.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    todo.completed 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}>
                    {todo.completed ? "✓ Selesai" : "⏳ Belum Selesai"}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TodoList;
