

const Dashboard = () => {
    return (


        <div className="p-6 grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Total Heroes</h3>
                <p className="text-3xl font-bold">10</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Visitors</h3>
                <p className="text-3xl font-bold">1.2k</p>
            </div>
        </div>


    );
};

export default Dashboard;
