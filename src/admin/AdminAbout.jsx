import { useEffect, useState } from "react";
import axios from "axios";

const AdminAbout = () => {
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([
    { name: "", icon: "" },
  ]);

  useEffect(() => {
    const fetchAbout = async () => {
      const res = await axios.get("http://localhost:8000/api/about");
      if (res.data) {
        setDescription(res.data.description);
        setSkills(res.data.skills);
      }
    };
    fetchAbout();
  }, []);

  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", icon: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/about", {
      description,
      skills,
    });
    alert("About section updated");
  };

  return (
    <div className="bg-white p-6 rounded-xl max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Edit About Section</h2>

      <textarea
        className="w-full border p-3 mb-4"
        placeholder="About description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <h3 className="font-semibold mb-2">Skills</h3>

      {skills.map((skill, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            placeholder="Skill name"
            value={skill.name}
            onChange={(e) =>
              handleSkillChange(index, "name", e.target.value)
            }
            className="border p-2 flex-1"
          />
          <input
            placeholder="Icon (FaReact)"
            value={skill.icon}
            onChange={(e) =>
              handleSkillChange(index, "icon", e.target.value)
            }
            className="border p-2 flex-1"
          />
        </div>
      ))}

      <button onClick={addSkill} className="text-sm text-blue-600 mb-4">
        + Add Skill
      </button>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default AdminAbout;
