import React from "react";

function ProjectCard(props) {
    return (
        <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 
                    hover:shadow-2xl hover:-translate-y-2 
                    transition-all duration-300">

            {/* Status */}
            <span className="flex  mb-3 px-3 py-1 text-xs font-semibold 
                       rounded-full bg-black/60 text-amber-300">
                {props.status}
            </span>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2">
                {props.title}
            </h3>

            {/* image */}
            <div>
                {props.image && (
                    <img
                        src={props.image}       
                        alt={props.title}     
                        className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                )}
            </div>
            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {props.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-medium rounded-xl 
                           bg-amber-500 text-black hover:bg-amber-400 transition">
                    View
                </button>

                <button className="px-4 py-2 text-sm font-medium rounded-xl 
                           border border-amber-500 text-amber-400 
                           hover:bg-amber-500 hover:text-black transition">
                    GitHub
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;
