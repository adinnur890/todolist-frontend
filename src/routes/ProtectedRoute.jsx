import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Bypass semua pengecekan
    return children;
};

export default ProtectedRoute;