import { useState, useEffect } from "react";
import axios from "axios";

function AdminAbout() {
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([{ name: "", icon: "" }]);

  // Fetch existing About data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("http://localhost:8000/about");
        setDescription(res.data.description || "");
        setSkills(res.data.skills || [{ name: "", icon: "" }]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAbout();
  }, []);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", icon: "" }]);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/about",
        { description, skills },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if protected
          },
        }
      );
      alert("About updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating About");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black/30 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Edit About</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="p-3 rounded border"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <h3 className="text-white font-semibold">Skills</h3>
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Skill Name"
              className="p-2 rounded border flex-1"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, "name", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Icon (e.g., FaReact)"
              className="p-2 rounded border flex-1"
              value={skill.icon}
              onChange={(e) => handleSkillChange(index, "icon", e.target.value)}
            />
            <button
              type="button"
              className="px-3 bg-red-600 rounded text-white"
              onClick={() => removeSkill(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-2 bg-blue-600 text-white rounded"
          onClick={addSkill}
        >
          Add Skill
        </button>

        <button className="py-3 bg-white text-black rounded font-bold hover:bg-gray-300">
          Save About
        </button>
      </form>
    </div>
  );
}

export default AdminAbout;