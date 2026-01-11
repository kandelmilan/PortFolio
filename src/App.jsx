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



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      {/* Admin Layout */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="heroes" element={<AdminHero />} />

    </Routes>

  );
}

export default App;