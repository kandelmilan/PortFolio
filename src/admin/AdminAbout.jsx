import { useState } from "react";

function AdminAbout() {

  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    alert("About updated");
  };4

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Edit About Section
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl flex flex-col gap-4"
      >

        <textarea
          className="p-3 border rounded"
          rows="6"
          placeholder="About description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default AdminAbout;