import { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";

function AdminAbout() {
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([{ name: "", icon: "" }]);
  const [loading, setLoading] = useState(false);
  const [savedSkills, setSavedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Fetch About
  const fetchAbout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/about", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = res.data;
      setDescription(data.description || "");
      setSkills(data.skills?.length ? data.skills : [{ name: "", icon: "" }]);
      setSavedSkills(data.skills || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const addSkill = () => setSkills([...skills, { name: "", icon: "" }]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validSkills = skills.filter(s => s.name?.trim() && s.icon?.trim());
    if (!description.trim()) {
      alert("Description cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/about",
        { description, skills: validSkills },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert("Saved successfully!");
      setSavedSkills(res.data.skills || validSkills);

      // Reset form
      setDescription("");
      setSkills([{ name: "", icon: "" }]);
    } catch (err) {
      console.error(err);
      alert("Failed to save About");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillName) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      const res = await axios.delete(`http://localhost:8000/about/skill/${skillName}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSavedSkills(res.data.skills);
    } catch (err) {
      console.error(err);
      alert("Failed to delete skill");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md my-6">
      <h2 className="text-3xl font-bold mb-6">Edit About</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow flex flex-col gap-4 mb-8">
        <textarea
          className="p-3 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <h3 className="font-semibold">Skills</h3>
        {skills.map((skill, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Skill Name"
              className="p-2 border rounded flex-1"
              value={skill.name}
              onChange={(e) => handleSkillChange(idx, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Icon (e.g., FaReact)"
              className="p-2 border rounded flex-1"
              value={skill.icon}
              onChange={(e) => handleSkillChange(idx, "icon", e.target.value)}
            />
            <button type="button" onClick={() => removeSkill(idx)} className="bg-gray-300 px-3 py-1 rounded">
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addSkill} className="bg-gray-800 text-white px-4 py-2 rounded w-fit">
          Add Skill
        </button>
        <button type="submit" className="bg-gray-800 text-white py-2 rounded">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      <h3 className="text-2xl font-bold mb-4">Skills Preview</h3>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Skill</th>
            <th className="p-3 text-left">Icon</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedSkills.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">No skills added yet.</td>
            </tr>
          ) : (
            savedSkills.map((skill, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3">{skill.name}</td>
                <td className="p-3">{skill.icon}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setSelectedSkill(skill)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.name)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedSkill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded text-center w-80">
            <h2 className="text-xl font-bold mb-2">{selectedSkill.name}</h2>
            <p className="text-gray-600 mb-4">Icon: {selectedSkill.icon}</p>
            <button onClick={() => setSelectedSkill(null)} className="bg-gray-800 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAbout;