import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

function About() {
  const [about, setAbout] = useState({
    description: "",
    skills: [],
  });


  useEffect(() => {
    const fetchAbout = async () => {
      const res = await fetch("http://localhost:8000/about");
      const data = await res.json();
      setAbout(data);
    };
    fetchAbout();
  }, []);

  if (!about) return null;

  return (
    <div className="max-w-5xl mx-auto text-white">
      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10">
        About Me
      </h2>

      <p className="text-center text-slate-400 text-lg max-w-3xl mx-auto mb-16">
        {about.description}
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {about.skills?.map((skill, index) => {
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
        })}
      </div>
    </div>
  );
}

export default About;
