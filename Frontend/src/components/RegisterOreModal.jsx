// RegisterOreModal.js
import React, { useState } from "react";

const RegisterOreModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    oreId: "",
    origin: "",
    weight: "",
    minedDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form data to the backend using fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/registerTantalumOre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setFormData({ oreId: "", origin: "", weight: "", minedDate: "" });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error registering ore.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Register Ore</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          X
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Ore ID
            </label>
            <input
              type="text"
              name="oreId"
              value={formData.oreId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Origin
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Weight
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Mined Date
            </label>
            <input
              type="text"
              name="minedDate"
              value={formData.minedDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Register Ore"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOreModal;
