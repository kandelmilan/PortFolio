import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/admin/dashboard");
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8000/admin/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/admin/dashboard");

        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">

            {/* 🔥 Background Glow */}
            <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-30 top-[-100px] left-[-100px]"></div>
            <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px]"></div>

            {/* 🔥 Card */}
            <form
                onSubmit={handleLogin}
                className="relative z-10 w-[380px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-6"
            >
                {/* Title */}
                <h1 className="text-3xl font-extrabold text-white text-center tracking-wide">
                    Admin Login
                </h1>

                <p className="text-gray-300 text-center text-sm">
                    Welcome back! Please login to continue
                </p>

                {/* Email */}
                <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
                    <FaEnvelope className="text-gray-300" />
                    <input
                        type="email"
                        placeholder="Email address"
                        className="bg-transparent outline-none text-white w-full placeholder-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
                    <FaLock className="text-gray-300" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent outline-none text-white w-full placeholder-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Footer */}
                <p className="text-center text-gray-400 text-sm">
                    Secure Admin Access 🔒
                </p>
            </form>
        </div>
    );
};

export default Login;