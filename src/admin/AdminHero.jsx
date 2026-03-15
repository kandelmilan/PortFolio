import { useState, useEffect } from "react";
import axios from "axios";

function AdminHero() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState(null);

  // Fetch current hero data on mount
  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await axios.get("http://localhost:8000/hero");
      setHeroData(res.data);
      setTitle(res.data.title || "");
      setSubtitle(res.data.subtitle || "");
    } catch (err) {
      console.error("Error fetching hero:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8000/hero",
        { title, subtitle },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Hero updated successfully!");
      fetchHero(); // refresh table
    } catch (err) {
      console.error("Error updating hero:", err.response?.data || err.message);
      alert("Error updating hero. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md my-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Hero Section</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded shadow-sm mb-8"
      >
        <input
          type="text"
          placeholder="Hero Title"
          className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Subtitle"
          className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="py-3 bg-gray-800 text-white rounded font-bold hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {/* Current Hero Table */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Current Hero Section</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="p-3 text-left border-b border-gray-300">Title</th>
              <th className="p-3 text-left border-b border-gray-300">Subtitle</th>
            </tr>
          </thead>
          <tbody>
            {heroData ? (
              <tr className="bg-gray-50">
                <td className="p-3 border-b border-gray-200">{heroData.title}</td>
                <td className="p-3 border-b border-gray-200">{heroData.subtitle}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="2" className="p-3 text-center text-gray-500">
                  No hero data yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHero;