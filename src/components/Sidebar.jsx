import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import Swal from "sweetalert2";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg font-semibold";
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-orange-500/20 border border-transparent hover:border-yellow-400/30";

  const logout = AuthController((state) => state.logout);
  const navigate = useNavigate();
  const user = AuthController((state) => state.user);

  const handleLogout = async () => {
    try {
      await logout();
      await navigate("/");
      Swal.fire({
        icon: "success",
        title: "Berhasil Logout",
        text: "Anda berhasil logout",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal Logout",
        text: "Silakan coba lagi",
      });
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 md:pt-6 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 flex flex-col justify-between z-50 transition-transform duration-300 shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } xl:translate-x-0`}
    >
      <div>
        {/* Tombol close (mobile only) */}
        <div className="flex justify-end xl:hidden p-4">
          <button onClick={onClose} className="text-white text-xl">
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center px-4 mb-6">
          <div className="relative">
            <img
              src={
                user?.avatar
                  ? `http://localhost:8000/storage/${user.avatar}`
                  : "/src/assets/profile-default.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gradient-to-r from-yellow-400 to-orange-500 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <p className="text-white font-semibold text-base mt-3">
            👋 Hallo, {user?.name || ""}
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {user?.is_premium ? (
              <>
                👑 Premium
                {user?.premium_expires_at && (
                  <span className="block text-yellow-400 text-xs mt-1">
                    Expired: {new Date(user.premium_expires_at).toLocaleDateString('id-ID')}
                  </span>
                )}
              </>
            ) : (
              "🆓 Gratis"
            )}
          </p>
        </div>

        <nav className="px-4">
          {user?.role === 'admin' ? (
            // Admin Menu
            <>
              <Link
                to="/admin/premium"
                className={
                  location.pathname === "/admin/premium" ? activeClass : baseClass
                }
              >
                <i className="fa-regular fa-user-shield"></i> Admin Panel
              </Link>
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile" ? activeClass : baseClass
                }
              >
                <i className="fa-regular fa-user"></i> Profile
              </Link>
            </>
          ) : (
            // User Menu
            <>
              <Link
                to="/dashboard"
                className={
                  location.pathname === "/dashboard" ? activeClass : baseClass
                }
              >
                <i className="fa-regular fa-home"></i> Dashboard
              </Link>
              <Link
                to="/todo-list"
                className={
                  location.pathname === "/todo-list" ||
                  location.pathname.startsWith("/todo-list-detail")
                    ? activeClass
                    : baseClass
                }
              >
                <i className="fa-regular fa-notebook"></i> Todo List
              </Link>
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile" ? activeClass : baseClass
                }
              >
                <i className="fa-regular fa-user"></i> Profile
              </Link>
              <Link
                to="/setting"
                className={
                  location.pathname === "/setting" ? activeClass : baseClass
                }
              >
                <i className="fa-regular fa-gear"></i> Setting
              </Link>
              <Link
                to="/premium"
                className={
                  location.pathname === "/premium" ? activeClass : baseClass
                }
              >
                <i className="fa-regular fa-crown"></i> Premium
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="px-4 pb-6">
        <button
          className="w-full gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
          onClick={handleLogout}
        >
          <i className="fa-regular fa-left-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
