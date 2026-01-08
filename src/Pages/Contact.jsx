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
    <div className="max-w-6xl py-30">
      <h2 className="text-4xl font-extrabold text-white text-center mb-12">
        Contact Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contacts.map((item, index) => (
          <div
            key={index}
            className={`group p-8 rounded-2xl bg-gradient-to-br ${item.bg} text-white shadow-xl hover:scale-105 transition-transform duration-300`}
          >
            <div className="text-4xl mb-4">{item.icon}</div>

            <h3 className="text-2xl font-bold mb-1">{item.name}</h3>
            <p className="opacity-90 mb-4">{item.username}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 transition"
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
