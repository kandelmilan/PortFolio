import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-black text-white p-6 ">
            <h2 className="text-2xl font-bold mb-10">Admin</h2>

            <nav className="space-y-4">
                <Link to="/admin/dashboard" className="block hover:text-gray-300">Dashboard</Link>
                <Link to="/admin/heroes" className="block hover:text-gray-300">Heroes</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
