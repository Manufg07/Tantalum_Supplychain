import React, { useState } from "react";

const ViewComponent = () => {
  const [componentId, setComponentId] = useState(""); // State for componentId input
  const [componentData, setComponentData] = useState(null); // State for storing component data
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input change
  const handleInputChange = (e) => {
    setComponentId(e.target.value);
  };

  // Handle search button click
  const handleSearch = async () => {
    if (!componentId) {
      setErrorMessage("Please provide a component ID.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setComponentData(null); // Clear previous data

    try {
      const response = await fetch(
        `/api/getComponent?componentId=${componentId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch component data.");
      }

      const data = await response.json();
      if (data.success) {
        setComponentData(data.data); // Set data when successful
      } else {
        setErrorMessage(data.message); // Display error message
      }
    } catch (error) {
      setErrorMessage(error.message); // Display error if fetch fails
    } finally {
      setLoading(false);
    }
  };

  // Modal component to display the component data
  const ComponentDataModal = ({ data, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Component Details
        </h2>

        <div>
          <p>
            <strong>AssetType:</strong> {data.assetType}
          </p>
          <p>
            <strong>Component ID:</strong> {data.componentId}
          </p>
          <p>
            <strong>Refined ID:</strong> {data.refinedId}
          </p>
          <p>
            <strong>Manufacturer:</strong> {data.manufacturer}
          </p>
          <p>
            <strong>Manufacture Date:</strong> {data.manufactureDate}
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
        View Component
      </h2>

      {/* Input for component ID and search button */}
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          value={componentId}
          onChange={handleInputChange}
          placeholder="Enter Component ID"
          className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Component"}
        </button>
      </div>

      {/* Display error message */}
      {errorMessage && (
        <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
      )}

      {/* Show component data in a modal if found */}
      {componentData && (
        <ComponentDataModal
          data={componentData}
          onClose={() => setComponentData(null)}
        />
      )}
    </div>
  );
};

export default ViewComponent;
