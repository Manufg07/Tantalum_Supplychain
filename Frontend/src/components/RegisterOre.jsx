import React, { useState } from "react";

const RegisterOre = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Modal Trigger */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Register Ore
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Register Ore
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="oreId" className="block text-gray-700">
                  Ore ID
                </label>
                <input
                  type="text"
                  id="oreId"
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="origin" className="block text-gray-700">
                  Origin
                </label>
                <input
                  type="text"
                  id="origin"
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-gray-700">
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="minedDate" className="block text-gray-700">
                  Mined Date
                </label>
                <input
                  type="date"
                  id="minedDate"
                  className="mt-1 w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
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
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterOre;
