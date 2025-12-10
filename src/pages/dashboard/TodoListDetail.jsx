import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SubtaskController from "../../controllers/SubtaskController";

function TodoListDetail() {
  const { id: taskId } = useParams();
  const {
    subtasks,
    getSubtasks,
    createSubtask,
    updateSubtask,
    deleteSubtask,
    changeStatus,
  } = SubtaskController();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSubtask, setCurrentSubtask] = useState(null);
  const [form, setForm] = useState({ title: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState({
    pending: [],
    in_progress: [],
    completed: [],
  });

  const columns = [
    { key: "pending", title: "Pending" },
    { key: "in_progress", title: "In Progress" },
    { key: "completed", title: "Done" },
  ];

  const fetchSubtasks = async () => {
    try {
      await getSubtasks(taskId);
    } catch (err) {
      console.error("Error fetching subtasks:", err);
    }
  };

  // Update tasks when subtasks change
  useEffect(() => {
    const grouped = { pending: [], in_progress: [], completed: [] };
    subtasks.forEach((item) => {
      if (grouped[item.status]) {
        grouped[item.status].push({ id: String(item.id), text: item.title });
      }
    });
    setTasks(grouped);
  }, [subtasks]);

  useEffect(() => {
    fetchSubtasks();
  }, [taskId]);

  const openAddModal = () => {
    setIsEditing(false);
    setForm({ title: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (subtask) => {
    setIsEditing(true);
    setCurrentSubtask(subtask);
    setForm({ title: subtask.text });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(async () => {
      try {
        if (isEditing) {
          await updateSubtask(currentSubtask.id, form);
        } else {
          await createSubtask(taskId, form);
        }

        setIsModalOpen(false);
        setIsLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setIsLoading(false);
      }
    }, 300);
  };

  const handleDeleteSubtask = async (id) => {
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

    if (!result.isConfirmed) return;

    setIsLoading(true);
    
    setTimeout(async () => {
      try {
        await deleteSubtask(id);
        setIsLoading(false);
      } catch (err) {
        console.error('Error deleting subtask:', err);
        setIsLoading(false);
      }
    }, 200);
  };

  const handleStatusChange = async (subtaskId, newStatus) => {
    setIsLoading(true);
    try {
      await changeStatus(subtaskId, newStatus);
    } catch (err) {
      console.error('Error changing status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 py-6 px-6 rounded-xl shadow-lg">
        <h1 className="font-bold text-3xl text-white drop-shadow-lg">📋 Todo List Detail</h1>
        <p className="text-white/90 text-sm mt-1">Kelola subtask dengan mudah</p>
      </div>

      <button
        onClick={openAddModal}
        className="font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-6"
      >
        ➕ Tambah Subtask
      </button>

      {isModalOpen && (
        <div className="fixed px-6 inset-0 bg-black/40 flex backdrop-blur items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">
              {isEditing ? "Edit Subtask" : "Tambah Subtask"}
            </h2>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ title: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-4 text-white"
              placeholder="Judul subtask"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.key}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 min-h-[200px] flex flex-col shadow-xl border border-gray-700"
          >
            <h2 className="font-bold text-center text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-3">
              {col.title}
            </h2>
            <div className="text-center text-gray-400 text-sm mb-3">
              {tasks[col.key].length} items
            </div>
            <hr className="border-gray-700 mb-4" />
            
            <div className="flex-1 space-y-3" style={{ minHeight: "50px" }}>
              {tasks[col.key].map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-600 hover:border-yellow-400"
                >
                  {/* Title & Actions in one row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium">{item.text}</div>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={() => openEditModal(item)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => handleDeleteSubtask(item.id)}
                        title="Hapus"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  {/* Status Control Buttons - Horizontal */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleStatusChange(item.id, "pending")}
                      disabled={isLoading || col.key === "pending" || col.key === "completed"}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-all flex-1 ${
                        col.key === "pending"
                          ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/50"
                          : col.key === "completed"
                          ? "bg-gray-600/20 text-gray-500 border border-gray-600/30 cursor-not-allowed"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 disabled:opacity-50"
                      }`}
                    >
                      ⏳ Pending
                    </button>
                    
                    <button
                      onClick={() => handleStatusChange(item.id, "in_progress")}
                      disabled={isLoading || col.key === "in_progress"}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-all flex-1 ${
                        col.key === "in_progress"
                          ? "bg-blue-500/30 text-blue-300 border border-blue-500/50"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 disabled:opacity-50"
                      }`}
                    >
                      🔄 In Progress
                    </button>
                    
                    <button
                      onClick={() => handleStatusChange(item.id, "completed")}
                      disabled={isLoading || col.key === "completed"}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-all flex-1 ${
                        col.key === "completed"
                          ? "bg-green-500/30 text-green-300 border border-green-500/50"
                          : "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 disabled:opacity-50"
                      }`}
                    >
                      ✅ Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoListDetail;
