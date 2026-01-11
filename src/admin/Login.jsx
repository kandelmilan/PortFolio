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
            const res = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/admin");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleLogin}
                className="w-96 p-6 border rounded shadow"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="********"
                    className="w-full p-3 mb-4 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
