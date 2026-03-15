import { useState } from "react";
import axios from "axios";

function AdminProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8000/project",
                { title, description, status, image },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                }
            );
            alert("Project added!");
            setTitle("");
            setDescription("");
            setStatus("");
            setImage("");
        } catch (err) {
            console.error(err);
            alert("Error adding project");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-black/30 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Add Project</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="p-3 rounded border"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="p-3 rounded border"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Status"
                    className="p-3 rounded border"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    className="p-3 rounded border"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button className="py-3 bg-white text-black rounded font-bold hover:bg-gray-300">
                    Add Project
                </button>
            </form>
        </div>
    );
}

export default AdminProject;