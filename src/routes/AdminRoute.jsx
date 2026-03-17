import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        console.log("TOKEN:", token);
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }
    } catch (err) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default AdminRoute;