import React from "react";
import { Outlet, Link } from "react-router-dom";

const RefiningDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <SidebarRefining /> */}

      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-16 md:ml-64 transition-all duration-300">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Refining Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track and manage your refining operations efficiently.
          </p>
        </header>

        {/* Dashboard Content with Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Overview Card */}
          <Link
            to="Dash/overview"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            <p className="text-gray-600 mt-2">
              Get an overview of your current refining processes and data.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Go to Overview
            </button>
          </Link>

          {/* Process Ore Card */}
          {/* <Link
            to="Dash/processOre"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">Process Ore</h2>
            <p className="text-gray-600 mt-2">
              Add and track details of ore refining processes.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Process Ore
            </button>
          </Link> */}

          {/* View Processed Ore Card */}
          {/* <Link
            to="Dash/viewProcessedOre"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              View Processed Ore
            </h2>
            <p className="text-gray-600 mt-2">
              Review details of processed ores.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Processed Ore
            </button>
          </Link> */}
        </section>

        {/* Nested Route Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default RefiningDashboard;
