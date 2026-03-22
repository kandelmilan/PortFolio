import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null); // modal
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/contact", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !link || !icon)
      return alert("All fields required");

    setLoading(true);
    try {
      if (editingId) {
        const res = await axios.put(
          `http://localhost:8000/contact/${editingId}`,
          { name, username, link, icon },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setContacts(
          contacts.map((c) => (c._id === editingId ? res.data : c))
        );
      } else {
        const res = await axios.post(
          "http://localhost:8000/contact",
          { name, username, link, icon },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setContacts([...contacts, res.data]);
      }

      // Reset form
      setName("");
      setUsername("");
      setLink("");
      setIcon("");
      setEditingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await axios.delete(`https://portfolio-backend-3bax.onrender.com/contact/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (c) => {
    setName(c.name);
    setUsername(c.username);
    setLink(c.link);
    setIcon(c.icon);
    setEditingId(c._id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md my-6">
      <h2 className="text-3xl font-bold mb-6">
        {editingId ? "Edit Contact" : "Add Contact"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Name (e.g., Facebook)"
          className="p-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username (e.g., Kandel Milan)"
          className="p-3 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link (https://...)"
          className="p-3 border rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="text"
          placeholder="Icon (FaFacebookF)"
          className="p-3 border rounded"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <button className="bg-gray-800 text-white py-2 rounded">
          {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* TABLE */}
      <h3 className="text-2xl font-bold mt-10 mb-4">Contacts</h3>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Link</th>
            <th className="p-3 text-left">Icon</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.username}</td>
              <td className="p-3">
                <a href={c.link} target="_blank" rel="noopener noreferrer">
                  {c.link}
                </a>
              </td>
              <td className="p-3">{c.icon}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={() => setSelectedContact(c)}
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  <FaEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
            <h2 className="text-xl font-bold mb-3">{selectedContact.name}</h2>
            <p className="mb-2">Username: {selectedContact.username}</p>
            <p className="mb-2">Link: {selectedContact.link}</p>
            <p className="mb-2">Icon: {selectedContact.icon}</p>

            <button
              onClick={() => setSelectedContact(null)}
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

export default AdminContacts;