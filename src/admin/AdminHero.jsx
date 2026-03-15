import { useState } from "react";

function AdminHero() {

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/hero", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, subtitle }),
    });

    alert("Hero updated");
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Edit Hero Section
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl flex flex-col gap-4"
      >

        <input
          className="p-3 border rounded"
          placeholder="Hero Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="p-3 border rounded"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <button
          className="bg-black text-white py-3 rounded"
        >
          Save
        </button>

      </form>

    </div>
  );
}

export default AdminHero;