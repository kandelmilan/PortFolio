import React from 'react'
import { Link } from 'react-router'

function Header() {
  return (
     <header className=" bg-black text-white p-5 sticky top-0 z-50 shadow-md">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-cyan-400">Rajan Portfolio</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
            <Link to="/about" className="hover:text-cyan-300 transition">About</Link>
            <Link to="/projects" className="hover:text-cyan-300 transition">Projects</Link>
            <Link to="/contact" className="hover:text-cyan-300 transition">Contact</Link>
          </div>
        </nav>
      </header>
  )
}

export default Header
