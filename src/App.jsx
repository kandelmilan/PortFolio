import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Projects from "./Pages/Project";
import Contact from "./Pages/Contact";
import Layout from "../Layout/layout";
import About from "./Pages/About";
import Login from "./admin/Login";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./admin/Dashboard";
import AdminHero from "./admin/AdminHero";
import AdminLayout from "./admin/AdminLayout";
import AdminAbout from "./admin/AdminAbout";

function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Login */}
      <Route path="/login" element={<Login />} />

      {/* Admin Protected Layout */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="heroes" element={<AdminHero />} />
        <Route path="about" element={<AdminAbout />} />
      </Route>
    </Routes>
  );
}

export default App;
