import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { FaUserCircle, FaHome } from "react-icons/fa";

function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    // Derive a page title from the path
    const pageTitle = location.pathname
        .split("/")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "Dashboard";

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <header className="flex justify-between items-center bg-white shadow p-4 sm:p-6">
                    <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>

                    <div className="flex items-center gap-4">
                        {/* Back to Home Button */}
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                        >
                            <FaHome /> Home
                        </button>

                        {/* Admin/User Info */}
                        <div className="flex items-center gap-2">
                            <FaUserCircle className="text-3xl text-gray-600" />
                            <span className="hidden sm:inline text-gray-700">Admin</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 sm:p-8 overflow-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;