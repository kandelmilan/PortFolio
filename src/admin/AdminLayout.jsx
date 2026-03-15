import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>

        </div>
    );
}

export default AdminLayout;