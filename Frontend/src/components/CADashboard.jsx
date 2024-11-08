import React from "react";
import { Outlet, Link } from "react-router-dom";

const CADashboard = () => {
  return (
    <div className="flex min-h-screen bg-teal-50">
      {/* Sidebar */}
      {/* <SidebarCA /> */}

      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-16 md:ml-64 transition-all duration-300">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-teal-800">
            Certification Authority Dashboard
          </h1>
          <p className="text-teal-600 mt-2">
            Oversee and manage all certification activities.
          </p>
        </header>

        {/* Dashboard Content with Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Issued Certificates Overview Card */}
          {/* <Link
            to="CADashboard/issuedCertificates"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-teal-800">
              Issued Certificates
            </h2>
            <p className="text-teal-600 mt-2">
              View and manage all issued certificates.
            </p>
            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
              Go to Issued Certificates
            </button>
          </Link> */}

          {/* Add New Certification Card */}
          {/* <Link
            to="CADashboard/addCertification"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-teal-800">
              Add New Certification
            </h2>
            <p className="text-teal-600 mt-2">
              Add details for new certifications issued.
            </p>
            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
              Add Certification
            </button>
          </Link> */}

          {/* Compliance Management Card */}
          {/* <Link
            to="CADashboard/manageCompliance"
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-teal-800">
              Compliance Management
            </h2>
            <p className="text-teal-600 mt-2">
              Monitor and enforce compliance standards.
            </p>
            <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
              Manage Compliance
            </button>
          </Link> */}
        </section>

        {/* Nested Route Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default CADashboard;
