import { useState, useEffect } from "react";
import axios from "axios";

function AdminProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(""); // For image URL
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch projects on mount
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get("http://localhost:8000/project", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects:", err.response?.data || err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return alert("Title and description are required!");
        setLoading(true);

        try {
            // Sending as JSON (if backend expects URL) 
            await axios.post(
                "http://localhost:8000/project",
                { title, description, status, image },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            alert("Project added successfully!");
            setTitle("");
            setDescription("");
            setStatus("");
            setImage("");
            fetchProjects(); // refresh table
        } catch (err) {
            console.error("Error adding project:", err.response?.data || err.message);
            alert("Error adding project. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md my-6">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Project</h2>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-6 bg-white rounded shadow-sm"
            >
                <input
                    type="text"
                    placeholder="Project Title"
                    className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Project Description"
                    className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Status (Optional)"
                    className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL (Optional)"
                    className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="py-3 bg-gray-800 text-white rounded font-bold hover:bg-gray-700 disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Project"}
                </button>
            </form>

            {/* Table */}
            <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Added Projects</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white rounded-lg">
                    <thead className="bg-gray-200 text-gray-800">
                        <tr>
                            <th className="p-3 text-left border-b border-gray-300">Title</th>
                            <th className="p-3 text-left border-b border-gray-300">Description</th>
                            <th className="p-3 text-left border-b border-gray-300">Status</th>
                            <th className="p-3 text-left border-b border-gray-300">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-3 text-center text-gray-500">
                                    No projects added yet.
                                </td>
                            </tr>
                        )}
                        {projects.map((proj, idx) => (
                            <tr
                                key={idx}
                                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            >
                                <td className="p-3 border-b border-gray-200">{proj.title}</td>
                                <td className="p-3 border-b border-gray-200">{proj.description}</td>
                                <td className="p-3 border-b border-gray-200">{proj.status}</td>
                                <td className="p-3 border-b border-gray-200">
                                    {proj.image ? (
                                        <img
                                            src={proj.image}
                                            alt={proj.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProject;