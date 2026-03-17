import { useState, useEffect } from "react";
import axios from "axios";

function AdminHero() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await axios.get("http://localhost:8000/hero");
      setHeroData(res.data);
      setTitle(res.data?.title || "");
      setSubtitle(res.data?.subtitle || "");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/hero", { title, subtitle });
      alert("Hero updated successfully!");
      setHeroData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update Hero.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md my-6">
      <h2 className="text-3xl font-bold mb-6">Edit Hero Section</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded shadow-sm mb-8">
        <input
          type="text"
          placeholder="Hero Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <textarea
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="py-3 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      <h3 className="text-2xl font-bold mb-4">Current Hero Section</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left border-b">Title</th>
              <th className="p-3 text-left border-b">Subtitle</th>
            </tr>
          </thead>
          <tbody>
            {heroData ? (
              <tr className="bg-gray-50">
                <td className="p-3 border-b">{heroData.title}</td>
                <td className="p-3 border-b">{heroData.subtitle}</td>
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