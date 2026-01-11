import { Children } from "react";
import { Navigate } from "react-router";


const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/admin/login" />
};

export default AdminRoute;