import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";

const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "MongoDB", icon: <FaDatabase /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
];

function About() {
  return (
    <div className="max-w-5xl mx-auto text-white">

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10">
        About Me
      </h2>

      {/* Description */}
      <p className="text-center text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto mb-16">
        I’m <span className="text-white font-medium">Rajan</span>, a web
        developer focused on building clean, efficient, and user-friendly web
        applications. I enjoy working with modern JavaScript frameworks and
        writing code that is simple, scalable, and maintainable.
      </p>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <span className="text-xl">{skill.icon}</span>
            <span className="text-sm tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default About;
