import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import About from "./About";

function Home() {
  const text = "Hi, I'm Rajan";
  const [displayedText, setDisplayedText] = useState("");
  const speed = 120;
  const delay = 1500;

  useEffect(() => {
    let index = 0;
    let intervalId;
    let timeoutId;

    const startTyping = () => {
      intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            index = 0;
            setDisplayedText("");
            startTyping();
          }, delay);
        }
      }, speed);
    };

    startTyping();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* GLOBAL SNOWFALL */}
      <Snowfall
        snowflakeCount={120}
        color="rgba(255,255,255,0.6)"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative z-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white">
          {displayedText}
        </h1>

        <p className="text-xl md:text-2xl text-white mt-4">
          I am building a portfolio.
        </p>
      </section>

      {/* ABOUT */}
      <section className="py-32 px-6 relative z-20">
        <About />
      </section>

    </div>
  );
}

export default Home;
