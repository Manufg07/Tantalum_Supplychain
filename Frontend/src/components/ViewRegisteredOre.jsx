import React, { useState } from "react";

const ViewRegisteredOre = () => {
  const [oreId, setOreId] = useState(""); // State for oreId input
  const [oreData, setOreData] = useState(null); // State for storing ore data
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // Loading state

  // Handle search input change
  const handleInputChange = (e) => {
    setOreId(e.target.value);
  };

  // Handle the search button click
  const handleSearch = async () => {
    if (!oreId) {
      setErrorMessage("Please provide an ore ID.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setOreData(null); // Clear previous data

    try {
      const response = await fetch(`/api/getRegisteredTantalumOre?oreId=${oreId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch ore data.");
      }

      const data = await response.json();
      if (data.success) {
        setOreData(data.data); // Set the data when successful
      } else {
        setErrorMessage(data.message); // Display error message
      }
    } catch (error) {
      setErrorMessage(error.message); // Display error if fetch fails
    } finally {
      setLoading(false);
    }
  };

  // Modal component to display the ore data
  const OreDataModal = ({ data, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close button to close modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Tantalum Ore Details
        </h2>

        {/* Close button inside the ore data section */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          X
        </button>

        <div>
          <p>
            <strong>AssetType:</strong> {data.assetType}
          </p>
          <p>
            <strong>Ore ID:</strong> {data.oreId}
          </p>
          <p>
            <strong>Origin:</strong> {data.origin}
          </p>
          <p>
            <strong>Weight:</strong> {data.weight}
          </p>
          <p>
            <strong>Mined Date:</strong> {data.minedDate}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
        View Registered Ore
      </h2>

      {/* Search input and button */}
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={oreId}
          onChange={handleInputChange}
          placeholder="Enter Ore ID"
          className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Ore"}
        </button>
      </div>

      {/* Display error message */}
      {errorMessage && (
        <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
      )}

      {/* Show ore data in a modal if it's found */}
      {oreData && (
        <OreDataModal data={oreData} onClose={() => setOreData(null)} />
      )}
    </div>
  );
};

export default ViewRegisteredOre;
