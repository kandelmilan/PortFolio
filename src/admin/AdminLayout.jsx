import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

const AdminLayout = () => {
    return (
        <div className="flex ">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-screen w-64">
                <Sidebar />
            </div>

            {/* Page Content */}
            <div className="ml-64 w-full p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;