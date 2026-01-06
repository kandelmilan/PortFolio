import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";

function About() {
  return (
    <section className="relative text-white flex flex-col items-center justify-center px-5 py-32">

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-extrabold text-cyan-400 mb-8 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
        About Me
      </h2>

      {/* Intro */}
      <p className="text-lg md:text-xl max-w-3xl text-center mb-16 text-slate-300">
        Hi, I’m <span className="text-cyan-400 font-semibold">Rajan</span>, a
        passionate web developer crafting interactive and dynamic web
        experiences. I love turning ideas into visually stunning, functional
        websites using{" "}
        <span className="text-cyan-400">React</span>,{" "}
        <span className="text-cyan-400">Node.js</span>, and modern web
        technologies.
      </p>

      {/* Skills */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16 text-center">
        <Skill icon={<FaReact />} color="text-cyan-400" label="React" />
        <Skill icon={<FaNodeJs />} color="text-green-500" label="Node.js" />
        <Skill icon={<FaDatabase />} color="text-yellow-400" label="MongoDB" />
        <Skill icon={<FaCss3Alt />} color="text-blue-500" label="CSS" />
        <Skill icon={<FaJsSquare />} color="text-yellow-400" label="JavaScript" />
      </div>


    </section>
  );
}

function Skill({ icon, color, label }) {
  return (
    <div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
      <div className={`${color} text-5xl mb-2`}>{icon}</div>
      <span className="text-slate-200">{label}</span>
    </div>
  );
}

export default About;
