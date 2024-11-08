import React, { useState } from "react";

const OreHistory = () => {
  const [oreId, setOreId] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setOreId(e.target.value);
  };

  // Fetch ore history from the backend
  const fetchOreHistory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setHistory([]);

    try {
      const response = await fetch(`/api/getOreHistory/${oreId}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setHistory(data.data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error fetching ore history.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching ore history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ore History</h2>
      <form onSubmit={fetchOreHistory} className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Ore ID</label>
        <input
          type="text"
          value={oreId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className={`w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get History"}
        </button>
      </form>

      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      {history.length > 0 && (
        <div className="overflow-auto">
          <h3 className="text-xl font-bold mb-2">Transaction History</h3>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Transaction ID</th>
                <th className="border px-4 py-2">Timestamp</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{record.txId}</td>
                  <td className="border px-4 py-2">
                    {new Date(record.timestamp.seconds * 1000).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {record.isDelete ? "Deleted" : "Updated"}
                  </td>
                  <td className="border px-4 py-2">
                    {typeof record.data === "string" ? (
                      record.data
                    ) : (
                      <pre>{JSON.stringify(record.data, null, 2)}</pre>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OreHistory;
