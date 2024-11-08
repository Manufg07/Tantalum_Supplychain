import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  DocumentIcon,
  EyeIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid";
import ProcessOreModal from "./ProcessOreModal"; // Ensure this is correctly imported

const SidebarRefining = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProcessOreModalOpen, setProcessOreModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openProcessOreModal = () => setProcessOreModalOpen(true);
  const closeProcessOreModal = () => setProcessOreModalOpen(false);

  return (
    <div>
      <motion.div
        className={`bg-gray-900 text-white h-full fixed top-0 transition-all duration-300 z-10 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 bg-white text-gray-900 px-2 py-1 rounded"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>

        <nav className="mt-12">
          <ul className="space-y-4">
            <li className="hover:bg-gray-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link
                  to="Refinedash/certified"
                  className="text-lg font-semibold"
                >
                  Overview
                </Link>
              ) : (
                <HomeIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li
              onClick={openProcessOreModal}
              className="hover:bg-gray-700 rounded flex items-center p-2 cursor-pointer"
            >
              {isSidebarOpen ? (
                <span className="text-lg font-semibold">Process Ore</span>
              ) : (
                <DocumentIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li className="hover:bg-gray-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="Refinedash/view" className="text-lg font-semibold">
                  View Processed Ore
                </Link>
              ) : (
                <EyeIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li className="hover:bg-gray-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link
                  to="Dash/viewRegisteredOre"
                  className="text-lg font-semibold"
                >
                  View Registered Ore
                </Link>
              ) : (
                <ShieldExclamationIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Process Ore Modal */}
      {isProcessOreModalOpen && (
        <ProcessOreModal
          isOpen={isProcessOreModalOpen}
          onClose={closeProcessOreModal}
        />
      )}
    </div>
  );
};

export default SidebarRefining;
