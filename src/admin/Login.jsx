import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/admin/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/admin");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
            <form
                onSubmit={handleLogin}
                className="w-96 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
            >
                <h1 className="text-3xl font-extrabold text-gray-800 text-center">Admin Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Login
                </button>

                <p className="text-center text-gray-500 text-sm">
                    Forgot password? <span className="text-purple-600 hover:underline cursor-pointer">Reset</span>
                </p>
            </form>
        </div>
    );
};

export default Login;