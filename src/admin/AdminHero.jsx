import { useEffect, useState } from "react";
import axios from "axios";

const AdminHero = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Load existing hero
    useEffect(() => {
        const fetchHero = async () => {
            const res = await axios.get("http://localhost:8000/hero");
            if (res.data) {
                setTitle(res.data.title);
                setDescription(res.data.description);
            }
        };
        fetchHero();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:8000/hero", {
            title,
            description,
        });

        alert("Hero section updated!");
    };

    return (
        <div className="max-w-2xl bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Hero Section</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Hero Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    placeholder="Hero Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-3 rounded h-32"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-2 rounded"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AdminHero;
