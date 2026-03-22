import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaSnapchatGhost,
} from "react-icons/fa";

const contacts = [
  {
    name: "Facebook",
    username: "Kandel Milan",
    link: "https://facebook.com",
    icon: <FaFacebookF />,
    bg: "from-blue-600 to-blue-800",
  },
  {
    name: "GitHub",
    username: "Kandel Milan",
    link: "https://github.com",
    icon: <FaGithub />,
    bg: "from-gray-700 to-gray-900",
  },
  {
    name: "Snapchat",
    username: "Kandel Milan",
    link: "https://snapchat.com",
    icon: <FaSnapchatGhost />,
    bg: "from-yellow-400 to-yellow-500 text-black",
  },
];

function Contact() {
  return (
    <div className="max-w-5xl mx-auto text-white py-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Contact Me
      </h2>
      <p className="text-center text-slate-400 text-lg max-w-3xl mx-auto mb-16">
        Reach out to me on my social profiles or just say hello!
      </p>

      <div className="flex flex-wrap justify-center gap-10">
        {contacts.map((item, index) => (
          <div
            key={index}
            className={`
              group w-64 p-8 rounded-2xl
              bg-gradient-to-br ${item.bg} text-white
              shadow-xl transform transition-all duration-500
              hover:scale-105 hover:shadow-2xl
              flex flex-col items-center text-center
            `}
          >
            <div className="text-5xl mb-4 group-hover:rotate-12 transition-transform duration-500">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold mb-1 group-hover:text-amber-400 transition-colors duration-300">
              {item.name}
            </h3>
            <p className="opacity-90 mb-4">{item.username}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-full
                         bg-white/20 hover:bg-white/40
                         hover:scale-110 transition-all duration-300"
            >
              Visit Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;