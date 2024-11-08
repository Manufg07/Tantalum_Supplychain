import React, { useState } from "react";

const CAModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    certificationId: "",
    oreId: "",
    certifier: "",
    complianceStatus: "",
    certifiedDate: "",
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

  // Check if complianceStatus is empty, if so, set it to 'Under Review'
  if (!formData.complianceStatus) {
    formData.complianceStatus = "Under Review";
  }

  try {
    const response = await fetch("/api/certifyEthicalSource", {
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
        certificationId: "",
        oreId: "",
        certifier: "",
        complianceStatus: "",
        certifiedDate: "",
      });
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Error certifying ethical source.");
    }
  } catch (error) {
    setErrorMessage("An error occurred while processing certification.");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">
          Certify Ethical Source
        </h2>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-teal-700"
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
          {/* Certification ID */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Certification ID
            </label>
            <input
              type="text"
              name="certificationId"
              value={formData.certificationId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Ore ID */}
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

          {/* Certifier */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Certifier
            </label>
            <input
              type="text"
              name="certifier"
              value={formData.certifier}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Compliance Status */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Compliance Status
            </label>
            <input
              type="text"
              name="complianceStatus"
              value={formData.complianceStatus}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Certified Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Certified Date
            </label>
            <input
              type="text"
              name="certifiedDate"
              value={formData.certifiedDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Success and Error Messages */}
          {successMessage && (
            <p className="text-teal-600 mb-4">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded bg-teal-600 text-white font-semibold hover:bg-teal-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CAModal;
