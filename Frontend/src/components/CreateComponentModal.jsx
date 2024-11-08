import React, { useState } from "react";

const CreateComponentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    componentId: "",
    oreId: "",
    manufacturer: "",
    manufactureDate: "",
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

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/createComponent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setFormData({
          componentId: "",
          refinedId: "",
          manufacturer: "",
          manufactureDate: "",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Successfully created component.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the component.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create Component
        </h2>

        {/* Close icon in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit}>
          {/* Component ID */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Component ID
            </label>
            <input
              type="text"
              name="componentId"
              value={formData.componentId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Refined ID */}
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

          {/* Manufacturer */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Manufacturer
            </label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Manufacture Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Manufacture Date
            </label>
            <input
              type="text"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Success and Error Messages */}
          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComponentModal;
