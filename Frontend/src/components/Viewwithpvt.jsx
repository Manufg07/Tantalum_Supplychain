import React, { useState } from "react";

const Viewwithpvt = () => {
  const [oreId, setOreId] = useState(""); // State for oreId input
  const [oreData, setOreData] = useState(null); // State for storing ore data
  const [privateOreData, setPrivateOreData] = useState(null); // State for private ore data
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => setOreId(e.target.value);

  const handleSearch = async () => {
    if (!oreId) {
      setErrorMessage("Please provide an ore ID.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setOreData(null);
    setPrivateOreData(null);

    try {
      // Fetch general ore data
      const response = await fetch(
        `/api/getRegisteredTantalumOre?oreId=${oreId}`
      );
      const data = await response.json();

      if (data.success) {
        setOreData(data.data);
        await fetchPrivateOreDetails(oreId);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Error fetching ore data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivateOreDetails = async (oreId) => {
    try {
      const response = await fetch(`/api/getPrivateOreDetails?oreId=${oreId}`);
      const data = await response.json();

      if (data.success) {
        setPrivateOreData(data.data);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Error fetching private ore details.");
    }
  };

  const OreDataModal = ({ data, privateData, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Tantalum Ore Details
        </h2>

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

          {privateData && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-blue-800">
                Private Details
              </h3>
              <p>
                <strong>Purity:</strong> {privateData.purity}
              </p>
              <p>
                <strong>Grade:</strong> {privateData.grade}
              </p>
              <p>
                <strong>Additional Info:</strong> {privateData.additionalInfo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
        View Registered Ore
      </h2>

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

      {errorMessage && (
        <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
      )}

      {oreData && (
        <OreDataModal
          data={oreData}
          privateData={privateOreData}
          onClose={() => {
            setOreData(null);
            setPrivateOreData(null);
          }}
        />
      )}
    </div>
  );
};

export default Viewwithpvt;
