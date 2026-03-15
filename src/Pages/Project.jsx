import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Snowfall from "react-snowfall";
import axios from "axios";

function Project() {
    const [projects, setProjects] = useState([]);

    // Fetch projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get("http://localhost:8000/project");
                setProjects(res.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="min-h-screen px-6 py-16">
            <Snowfall />
            <h1 className="text-4xl font-bold text-white text-center mb-12">
                My Projects
            </h1>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {projects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        title={project.title}
                        image={project.image}
                        description={project.description}
                        status={project.status}
                    />
                ))}
            </div>
        </section>
    );
}

export default Project;