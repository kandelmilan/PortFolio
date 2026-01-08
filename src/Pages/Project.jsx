import ProjectCard from "./ProjectCard";
import CardData from "../assets/mockData";
import Snowfall from "react-snowfall";

function Project() {
    return (
        <section className="min-h-screen px-6 py-16">
            <Snowfall/>
            <h1 className="text-4xl font-bold text-white text-center mb-12">
                My Projects
            </h1>

            {/* GRID CONTROLS LAYOUT */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {CardData.map((project) => (
                    <ProjectCard
                        key={project.id}
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
