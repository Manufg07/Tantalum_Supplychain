import React, { useState, useEffect } from "react";

const ViewMinedOres = () => {
  const [ores, setOres] = useState([]); // State for the list of ores
  const [selectedOre, setSelectedOre] = useState(null); // State for selected ore to update
  const [complianceStatus, setComplianceStatus] = useState("request"); // Default compliance status
  const [certifier, setCertifier] = useState(""); // Certifier input
  const [certificationDate, setCertificationDate] = useState(""); // Certification date input
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the list of ores from the backend on component mount
  useEffect(() => {
    fetchOres();
  }, []);

  const fetchOres = async () => {
    try {
      const response = await fetch("/api/getMinedOresForCertification");
      const data = await response.json();
      if (data.success) {
        setOres(data.data);
      } else {
        console.error("Failed to fetch ores:", data.message);
      }
    } catch (error) {
      console.error("Error fetching ores:", error);
    }
  };

  // Function to open the update modal
  const openUpdateModal = (ore) => {
    setSelectedOre(ore);
    setComplianceStatus(ore.complianceStatus || "request");
    setCertifier("");
    setCertificationDate("");
    setErrorMessage("");
  };

  // Function to handle compliance status update submission
  const handleUpdateComplianceStatus = async () => {
    if (!complianceStatus || !certifier || !certificationDate) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/updateComplianceStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oreId: selectedOre.oreId,
          complianceStatus,
          certifier,
          certificationDate,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Compliance status updated successfully!");

        // Update the ores state with the new data
        setOres((prevOres) =>
          prevOres.map((ore) =>
            ore.oreId === selectedOre.oreId
              ? {
                  ...ore,
                  complianceStatus,
                  certifier,
                  certificationDate,
                }
              : ore
          )
        );
        setSelectedOre(null); // Close the modal
      } else {
        setErrorMessage(data.message || "Failed to update compliance status.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Modal component to update compliance status
  const UpdateComplianceModal = ({ ore, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-teal-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-teal-900 mb-4">
          Update Compliance Status
        </h2>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Compliance Status
          </label>
          <select
            value={complianceStatus}
            onChange={(e) => setComplianceStatus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          >
            <option value="request">Request</option>
            <option value="under review">Under Review</option>
            <option value="certified">Certified</option>
            <option value="rejected">Rejected</option>
          </select>

          <label className="block mb-2 font-semibold text-gray-700">
            Certifier
          </label>
          <input
            type="text"
            value={certifier}
            onChange={(e) => {
              console.log("Certifier:", e.target.value);
              setCertifier(e.target.value);
            }}
            placeholder="Enter Certifier Name"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2 font-semibold text-gray-700">
            Certification Date
          </label>
          <input
            type="text"
            value={certificationDate}
            onChange={(e) => setCertificationDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

          <button
            onClick={handleUpdateComplianceStatus}
            className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-teal-900 mb-4 text-center">
        Ore List for Certification
      </h2>

      <table className="w-full border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="p-3 border">Ore ID</th>
            <th className="p-3 border">Origin</th>
            <th className="p-3 border">Weight</th>
            <th className="p-3 border">Mined Date</th>
            <th className="p-3 border">Compliance Status</th>
            <th className="p-3 border">Certifier</th>
            <th className="p-3 border">Certification Date</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ores.map((ore) => (
            <tr key={ore.oreId} className="text-center">
              <td className="p-3 border">{ore.oreId}</td>
              <td className="p-3 border">{ore.origin}</td>
              <td className="p-3 border">{ore.weight}</td>
              <td className="p-3 border">{ore.minedDate}</td>
              <td className="p-3 border">
                {ore.complianceStatus || "Pending"}
              </td>
              <td className="p-3 border">{ore.certifier || "N/A"}</td>
              <td className="p-3 border">{ore.certificationDate || "N/A"}</td>
              <td className="p-3 border">
                <button
                  onClick={() => openUpdateModal(ore)}
                  className="bg-teal-500 text-white p-2 rounded hover:bg-teal-700"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the update modal if an ore is selected */}
      {selectedOre && (
        <UpdateComplianceModal
          ore={selectedOre}
          onClose={() => setSelectedOre(null)}
        />
      )}
    </div>
  );
};

export default ViewMinedOres;
