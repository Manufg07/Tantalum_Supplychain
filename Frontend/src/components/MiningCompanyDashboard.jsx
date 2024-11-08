import React from "react";
import { Outlet, Link } from "react-router-dom";

const MiningCompanyDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <SidebarMining /> */}

      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-16 md:ml-64 transition-all duration-300">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Mining Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage ore records, view details, and track processes efficiently.
          </p>
        </header>

        {/* Dashboard Content with Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Overview Card */}
          {/* <Link
            to="Dash/overview"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            <p className="text-gray-600 mt-2">
              Quick view of your current mining operations and statistics.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Go to Overview
            </button>
          </Link> */}

          {/* Register Ore Card */}
          {/* <Link
            to="Dash/registerOre"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Register Ore
            </h2>
            <p className="text-gray-600 mt-2">
              Add details of newly mined ore and track their journey.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Register New Ore
            </button>
          </Link> */}

          {/* View Registered Ore Card */}
          {/* <Link
            to="Dash/viewOre"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              View Registered Ore
            </h2>
            <p className="text-gray-600 mt-2">
              View details of ores already registered in the system.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Ore
            </button>
          </Link> */}

          {/* Private Ore Details Card */}
          <Link
            to="Dash/privateOre"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Private Ore Details
            </h2>
            <p className="text-gray-600 mt-2">
              Access secure ore details shared with authorized parties.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Private Details
            </button>
          </Link>
        </section>

        {/* Nested Route Content */}
        {/* <div className="mt-8 bg-white rounded-lg shadow p-6"> */}
          <Outlet /> {/* This will render the selected route's component */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default MiningCompanyDashboard;
