import React from "react";

function Header() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-black backdrop-blur-md text-white p-5 sticky top-0 z-50 shadow-md">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">

        <h1
          className="text-2xl font-bold text-cyan-400 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          Portfolio
        </h1>

        <div className="space-x-6">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-cyan-300 transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-cyan-300 transition"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="hover:text-cyan-300 transition"
          >
            Projects
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-cyan-300 transition"
          >
            Contact
          </button>
        </div>

      </nav>
    </header>
  );
}

export default Header;
