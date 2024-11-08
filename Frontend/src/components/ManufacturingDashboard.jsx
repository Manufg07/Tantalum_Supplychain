import React from "react";
import { Outlet, Link } from "react-router-dom";

const ManufacturingDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <SidebarManufacturing /> */}

      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-16 md:ml-64 transition-all duration-300">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Manufacturing Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and oversee manufacturing operations.
          </p>
        </header>

        {/* Dashboard Content with Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Overview Card */}
          <Link
            to="ManufacturingDash/overview"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            <p className="text-gray-600 mt-2">
              Overview of current manufacturing processes and data.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Go to Overview
            </button>
          </Link>
        </section>

        {/* Nested Route Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default ManufacturingDashboard;
