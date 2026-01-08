import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Projects from "./Pages/Project";
import Contact from "./Pages/Contact";
import Layout from "../Layout/layout";
import About from "./Pages/About";


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;