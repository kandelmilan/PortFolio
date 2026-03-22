import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from backend
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:8000/contact");
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };
    fetchContacts();
  }, []);

  // Default gradient per platform
  const platformGradient = {
    Facebook: "from-blue-600 to-blue-800",
    GitHub: "from-gray-700 to-gray-900",
    Snapchat: "from-yellow-400 to-yellow-500 text-black",
    Instagram: "from-pink-500 to-purple-600",
    LinkedIn: "from-blue-500 to-blue-700",
    Twitter: "from-blue-400 to-blue-600",
    YouTube: "from-red-500 to-red-700",
  };

  return (
    <div className="max-w-6xl mx-auto text-white py-20 px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Contact Me
      </h2>
      <p className="text-center text-slate-400 text-lg max-w-3xl mx-auto mb-16">
        Reach out to me on my social profiles or just say hello!
      </p>

      <div className="flex flex-wrap justify-center gap-10">
        {contacts.map((item) => {
          const IconComponent = FaIcons[item.icon] || FaIcons.FaLink;

          // Use default gradient based on platform
          const gradient = platformGradient[item.name] || "from-gray-500 to-gray-700";

          return (
            <div
              key={item._id}
              className={`
                group w-64 p-8 rounded-2xl
                bg-gradient-to-br ${gradient} text-white
                shadow-xl transform transition-all duration-500
                hover:scale-105 hover:shadow-2xl
                flex flex-col items-center text-center
              `}
            >
              <div className="text-5xl mb-4 group-hover:rotate-12 transition-transform duration-500">
                <IconComponent />
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
          );
        })}
      </div>
    </div>
  );
}

export default Contact;