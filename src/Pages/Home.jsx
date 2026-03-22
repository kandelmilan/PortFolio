import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";
import axios from "axios";

function Home() {
  const [hero, setHero] = useState({ title: "", subtitle: "" });
  const [displayedText, setDisplayedText] = useState("");

  // Fetch hero data
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-3bax.onrender.com/hero");
        setHero(res.data || { title: "Hi, I'm a Developer", subtitle: "Welcome to my portfolio" });
      } catch (err) {
        console.error("Error fetching hero:", err);
      }
    };
    fetchHero();
  }, []);

  // Typing effect for title
  useEffect(() => {
    let index = 0;
    let timeoutId;

    const type = () => {
      if (index < hero.title.length) {
        setDisplayedText(hero.title.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(type, 200);
      } else {
        setTimeout(() => {
          index = 0;
          setDisplayedText("");
          type();
        }, 2500);
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [hero.title]);

  return (
    <div className="bg-[#0a0a23] text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 overflow-hidden"
      >
        {/* Snowfall covering only the hero section */}
        <div className="absolute inset-0 z-10">
          <Snowfall
            snowflakeCount={100}
            color="rgba(255,255,255,0.3)"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto">
          {/* Animated Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
            {displayedText}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-2xl text-gray-300 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* Call-to-action buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-gray-400 text-gray-200 font-semibold rounded-lg hover:bg-gray-700 hover:text-white transform transition-all"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 bg-[#0a0a23]">
        <About />
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-32 px-6 bg-[#0a0a23]">
        <Project />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 bg-[#0a0a23]">
        <Contact />
      </section>
    </div>
  );
}

export default Home;