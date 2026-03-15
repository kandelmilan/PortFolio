function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Hero Section</h2>
          <p className="text-gray-500">Manage hero content</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">About Section</h2>
          <p className="text-gray-500">Manage skills & description</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-gray-500">Manage portfolio projects</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;