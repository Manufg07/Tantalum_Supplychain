import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  PuzzlePieceIcon,
  ClipboardDocumentIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import CreateComponentModal from "./CreateComponentModal"; // Ensure this modal component is correctly implemented and imported

const SidebarManufacturing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateComponentModalOpen, setCreateComponentModalOpen] =
    useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openCreateComponentModal = () => setCreateComponentModalOpen(true);
  const closeCreateComponentModal = () => setCreateComponentModalOpen(false);

  return (
    <div>
      <motion.div
        className={`bg-indigo-800 text-gray-200 h-full fixed top-0 transition-all duration-300 z-10 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 bg-gray-200 text-indigo-800 px-2 py-1 rounded hover:bg-indigo-500 hover:text-white"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>

        <nav className="mt-12">
          <ul className="space-y-4">
            <li className="hover:bg-indigo-600 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="Manu/certified" className="text-lg font-semibold">
                  Overview
                </Link>
              ) : (
                <HomeIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li
              onClick={openCreateComponentModal}
              className="hover:bg-indigo-600 rounded flex items-center p-2 cursor-pointer"
            >
              {isSidebarOpen ? (
                <span className="text-lg font-semibold">Create Component</span>
              ) : (
                <PuzzlePieceIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li className="hover:bg-indigo-600 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="Manu/view" className="text-lg font-semibold">
                  Get Component Field
                </Link>
              ) : (
                <ClipboardDocumentIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li className="hover:bg-indigo-600 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link
                  to="ManufacturingDash/viewRegisteredComponents"
                  className="text-lg font-semibold"
                >
                  View Registered Components
                </Link>
              ) : (
                <WrenchIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Create Component Modal */}
      {isCreateComponentModalOpen && (
        <CreateComponentModal
          isOpen={isCreateComponentModalOpen}
          onClose={closeCreateComponentModal}
        />
      )}
    </div>
  );
};

export default SidebarManufacturing;
