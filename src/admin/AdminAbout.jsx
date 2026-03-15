import { useState, useEffect } from "react";
import axios from "axios";

function AdminAbout() {
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([{ name: "", icon: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("http://localhost:8000/about", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDescription(res.data.description || "");
        setSkills(res.data.skills || [{ name: "", icon: "" }]);
      } catch (err) {
        console.error("Error fetching About:", err.response?.data || err.message);
      }
    };
    fetchAbout();
  }, []);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => setSkills([...skills, { name: "", icon: "" }]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8000/api/about",
        { description, skills },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("About updated successfully!");
    } catch (err) {
      console.error("Error updating About:", err.response?.data || err.message);
      alert("Error updating About. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md my-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit About</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded shadow-sm mb-8"
      >
        <textarea
          className="p-3 rounded border border-gray-300 focus:ring-2 focus:ring-gray-400"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <h3 className="text-gray-800 font-semibold">Skills</h3>
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Skill Name"
              className="p-2 rounded border border-gray-300 flex-1 focus:ring-2 focus:ring-gray-400"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, "name", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Icon (e.g., FaReact)"
              className="p-2 rounded border border-gray-300 flex-1 focus:ring-2 focus:ring-gray-400"
              value={skill.icon}
              onChange={(e) => handleSkillChange(index, "icon", e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-all"
              onClick={() => removeSkill(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 w-fit transition-all"
          onClick={addSkill}
        >
          Add Skill
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 transition-all"
        >
          {loading ? "Saving..." : "Save About"}
        </button>
      </form>

      {/* Skills Table */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Current Skills</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="p-3 text-left border-b border-gray-300">Skill Name</th>
              <th className="p-3 text-left border-b border-gray-300">Icon</th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-3 text-center text-gray-500">
                  No skills added yet.
                </td>
              </tr>
            ) : (
              skills.map((skill, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 border-b border-gray-200">{skill.name}</td>
                  <td className="p-3 border-b border-gray-200">{skill.icon}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAbout;