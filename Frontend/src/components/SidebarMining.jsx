import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  DocumentIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import RegisterOreModal from "./RegisterOreModal"; // Ensure this is correctly imported

const SidebarMining = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRegisterOreModalOpen, setRegisterOreModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openRegisterOreModal = () => setRegisterOreModalOpen(true);
  const closeRegisterOreModal = () => setRegisterOreModalOpen(false);

  return (
    <div>
      <motion.div
        className={`bg-blue-900 text-white h-full fixed top-0 transition-all duration-300 z-10 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 bg-white text-blue-900 px-2 py-1 rounded"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>

        <nav className="mt-12">
          <ul className="space-y-4">
            <li className="hover:bg-blue-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="Dash/history" className="text-lg font-semibold">
                  Overview
                </Link>
              ) : (
                <HomeIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li
              onClick={openRegisterOreModal}
              className="hover:bg-blue-700 rounded flex items-center p-2 cursor-pointer"
            >
              {isSidebarOpen ? (
                <span className="text-lg font-semibold">Register Ore</span>
              ) : (
                <DocumentIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li className="hover:bg-blue-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="Dash/viewOre" className="text-lg font-semibold">
                  View Registered Ore
                </Link>
              ) : (
                <EyeIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li className="hover:bg-blue-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="Dash/pvt" className="text-lg font-semibold">
                  Private Ore Details
                </Link>
              ) : (
                <LockClosedIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Register Ore Modal */}
      {isRegisterOreModalOpen && (
        <RegisterOreModal
          isOpen={isRegisterOreModalOpen}
          onClose={closeRegisterOreModal}
        />
      )}
    </div>
  );
};

export default SidebarMining;
