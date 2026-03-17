import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";

function AdminProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);


    const [selectedProject, setSelectedProject] = useState(null); // for modal

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
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return alert("Required fields missing");

        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:8000/project",
                { title, description, status, image },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setProjects([...projects, res.data]); // instant update
            setTitle("");
            setDescription("");
            setStatus("");
            setImage("");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // DELETE (instant UI update)
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this project?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8000/project/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            // remove from UI instantly
            setProjects(projects.filter((p) => p._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md my-6">
            <h2 className="text-3xl font-bold mb-6">Add Project</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="p-3 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    className="p-3 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Status"
                    className="p-3 border rounded"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    className="p-3 border rounded"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <button className="bg-gray-800 text-white py-2 rounded">
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>

            {/* TABLE */}
            <h3 className="text-2xl font-bold mt-10 mb-4">Projects</h3>

            <table className="w-full bg-white rounded shadow">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Image</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((proj) => (
                        <tr key={proj._id} className="border-t">
                            <td className="p-3">{proj.title}</td>
                            <td className="p-3">{proj.description}</td>
                            <td className="p-3">{proj.status || "N/A"}</td>

                            <td className="p-3">
                                {proj.image ? (
                                    <img src={proj.image} className="w-16 h-16 rounded" />
                                ) : "N/A"}
                            </td>

                            {/* ACTIONS */}
                            <td className="p-3">
                                <div className="flex items-center gap-3">

                                    {/* VIEW */}
                                    <button
                                        onClick={() => setSelectedProject(proj)}
                                        className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        <FaEye /> View
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDelete(proj._id)}
                                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        <FaTrash /> Delete
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* CENTER MODAL */}
            {selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-3">{selectedProject.title}</h2>
                        <p className="mb-2">{selectedProject.description}</p>
                        <p className="text-gray-500 mb-4">
                            Status: {selectedProject.status || "N/A"}
                        </p>

                        {selectedProject.image && (
                            <img
                                src={selectedProject.image}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                        )}

                        <button
                            onClick={() => setSelectedProject(null)}
                            className="bg-gray-800 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProject;