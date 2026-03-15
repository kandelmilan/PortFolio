import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 bg-black text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/admin/dashboard"
          className="hover:bg-gray-800 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/heroes"
          className="hover:bg-gray-800 p-3 rounded"
        >
          Hero Section
        </Link>

        <Link
          to="/admin/about"
          className="hover:bg-gray-800 p-3 rounded"
        >
          About Section
        </Link>
        <Link
          to="/admin/project"
          className="hover:bg-gray-800 p-3 rounded"
        >
          Project Section
        </Link>

      </nav>

    </div>
  );
}

export default AdminSidebar;