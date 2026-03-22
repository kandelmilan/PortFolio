import React from "react";

function ProjectCard(props) {
    return (
        <div
            className="bg-[#020617] border border-white/10 rounded-2xl p-6
            transform transition-transform duration-300 ease-out
            hover:-translate-y-3 hover:scale-[1.02]
            hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
        >
            {/* Status */}
            <span
                className="inline-block mb-3 px-3 py-1 text-xs font-semibold
                rounded-full bg-black/60 text-amber-300
                transition-colors duration-300
                hover:bg-amber-500 hover:text-black"
            >
                {props.status}
            </span>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 hover:text-amber-400">
                {props.title}
            </h3>

            {/* Image */}
            <div className="overflow-hidden rounded-xl mb-4">
                {props.image && (
                    <img
                        src={props.image}
                        alt={props.title}
                        className="w-full h-48 object-cover
                        transition-transform duration-500 ease-in-out
                        hover:scale-110"
                    />
                )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {props.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    className="px-4 py-2 text-sm font-medium rounded-xl
                    bg-amber-500 text-black
                    transition-all duration-300 ease-in-out
                    hover:bg-amber-400 hover:scale-105 active:scale-95"
                >
                    View
                </button>

                <button
                    className="px-4 py-2 text-sm font-medium rounded-xl
                    border border-amber-500 text-amber-400
                    transition-all duration-300 ease-in-out
                    hover:bg-amber-500 hover:text-black
                    hover:scale-105 active:scale-95"
                >
                    GitHub
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;