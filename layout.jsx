// src/Layout/layout.jsx
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header / Navbar */}
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                        <Link to="/">My Portfolio</Link>
                    </h1>
                    <nav className="space-x-4">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/about" className="hover:underline">About</Link>
                        <Link to="/projects" className="hover:underline">Projects</Link>
                        <Link to="/contact" className="hover:underline">Contact</Link>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 container mx-auto p-4">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                © {new Date().getFullYear()} My Portfolio. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;