import React, { useState, useEffect } from "react";

const ViewCertifiedOres = () => {
  const [ores, setOres] = useState([]);
  const [selectedOre, setSelectedOre] = useState(null);
  const [refinedId, setRefinedId] = useState(""); // New field
  const [purity, setPurity] = useState(""); // New field
  const [processingDate, setProcessingDate] = useState(""); // New field
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOres();
  }, []);

  const fetchOres = async () => {
    try {
      const response = await fetch("/api/getCertifiedOresForRefine");
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

  const openUpdateModal = (ore) => {
    setSelectedOre(ore);
    setRefinedId("");
    setPurity("");
    setProcessingDate("");
    setErrorMessage("");
  };

  const handleUpdateComplianceStatus = async () => {
    if (
      !refinedId ||
      !purity ||
      !processingDate
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/updateRefine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oreId: selectedOre.oreId,
          refinedId,
          purity,
          processingDate,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Refine status updated successfully!");

        setOres((prevOres) =>
          prevOres.map((ore) =>
            ore.oreId === selectedOre.oreId
              ? {
                  ...ore,
                  refinedId,
                  purity,
                  processingDate,
                }
              : ore
          )
        );
        setSelectedOre(null);
      } else {
        setErrorMessage(data.message || "Failed to update compliance status.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
            Refined ID
          </label>
          <input
            type="text"
            value={refinedId}
            onChange={(e) => setRefinedId(e.target.value)}
            placeholder="Enter Refined ID"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2 font-semibold text-gray-700">
            Purity
          </label>
          <input
            type="text"
            value={purity}
            onChange={(e) => setPurity(e.target.value)}
            placeholder="Enter Purity"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          <label className="block mb-2 font-semibold text-gray-700">
            Processing Date
          </label>
          <input
            type="text"
            value={processingDate}
            onChange={(e) => setProcessingDate(e.target.value)}
            placeholder="Enter Processing Date"
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
            <th className="p-3 border">RefineID</th>
            <th className="p-3 border">Purity</th>
            <th className="p-3 border">Process Date</th>
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
              <td className="p-3 border">{ore.refinedId || "N/A"}</td>
              <td className="p-3 border">{ore.purity || "N/A"}</td>
              <td className="p-3 border">{ore.processingDate || "N/A"}</td>
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

      {selectedOre && (
        <UpdateComplianceModal
          ore={selectedOre}
          onClose={() => setSelectedOre(null)}
        />
      )}
    </div>
  );
};

export default ViewCertifiedOres;
