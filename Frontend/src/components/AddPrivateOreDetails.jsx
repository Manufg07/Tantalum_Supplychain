import React, { useState } from "react";

const AddPrivateOreDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oreId, setOreId] = useState("");
  const [privateDetailsKey, setPrivateDetailsKey] =
    useState("orePrivateDetails");
  const [purity, setPurity] = useState("");
  const [grade, setGrade] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const privateDetails = {
      purity,
      grade,
      additionalInfo,
    };

    try {
      const response = await fetch("/api/addPrivateOreDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oreId,
          privateDetailsKey,
          orePrivateDetails: privateDetails,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Private ore details added successfully!");
      } else {
        setError(data.message || "Error adding private ore details.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      {/* Modal Trigger */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Add Private Ore Details
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-teal-900 mb-4">
              Add Private Ore Details
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="oreId" className="block text-gray-700">
                  Ore ID
                </label>
                <input
                  type="text"
                  id="oreId"
                  value={oreId}
                  onChange={(e) => setOreId(e.target.value)}
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="purity" className="block text-gray-700">
                  Purity
                </label>
                <input
                  type="text"
                  id="purity"
                  value={purity}
                  onChange={(e) => setPurity(e.target.value)}
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="grade" className="block text-gray-700">
                  Grade
                </label>
                <input
                  type="text"
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-gray-700">
                  Additional Info
                </label>
                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-teal-500"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Submit
                </button>
              </div>

              {/* Display success or error message */}
              {message && (
                <p className="text-green-600 mt-4 text-center">{message}</p>
              )}
              {error && (
                <p className="text-red-600 mt-4 text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPrivateOreDetails;
