import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";
import axios from "axios";

function Home() {
  const [hero, setHero] = useState({ title: "", subtitle: "" });
  const [displayedText, setDisplayedText] = useState("");
  const speed = 160;
  const delay = 1500;

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("http://localhost:8000/hero");
        setHero(res.data || { title: "", subtitle: "" });
      } catch (err) {
        console.error(err);
      }
    };
    fetchHero();
  }, []);

  useEffect(() => {
    let index = 0;
    let intervalId;
    let timeoutId;

    const startTyping = () => {
      intervalId = setInterval(() => {
        setDisplayedText(hero.title.slice(0, index + 1));
        index++;
        if (index === hero.title.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            index = 0;
            setDisplayedText("");
            startTyping();
          }, delay);
        }
      }, speed);
    };

    if (hero.title) startTyping();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [hero.title]);

  return (
    <div className="relative bg-[#020617]">
      <Snowfall snowflakeCount={120} color="rgba(255,255,255,0.6)" style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: 10, pointerEvents: "none" }} />

      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative z-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white">{displayedText}</h1>
        <p className="mt-4 text-xl md:text-2xl text-white">{hero.subtitle}</p>
      </section>

      <section id="about" className="py-32 px-6 relative z-20">
        <About />
      </section>

      <section id="projects" className="py-32 px-6 relative z-20">
        <Project />
      </section>

      <section id="contact" className="py-32 px-6 relative z-20">
        <Contact />
      </section>
    </div>
  );
}

export default Home;