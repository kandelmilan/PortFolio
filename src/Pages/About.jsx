import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import axios from "axios";

function About() {
  const [about, setAbout] = useState({ description: "", skills: [] });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("http://localhost:8000/about"); // single About
        setAbout(res.data);
      } catch (err) {
        console.error("Error fetching About:", err);
      }
    };
    fetchAbout();
  }, []);

  return (
    <div className="max-w-5xl mx-auto text-white py-16">
      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10">About Me</h2>
      <p className="text-center text-slate-400 text-lg max-w-3xl mx-auto mb-16">
        {about.description || "I am a passionate developer always learning new technologies."}
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {about.skills?.length > 0 ? (
          about.skills.map((skill, index) => {
            const Icon = FaIcons[skill.icon] || FaIcons.FaCode;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10"
              >
                <Icon className="text-xl" />
                <span>{skill.name}</span>
              </div>
            );
          })
        ) : (
          <p className="text-slate-400 text-center w-full">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}

export default About;