import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  ShieldCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import CAModal from "./CAModal";

const SidebarCA = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCAModalOpen, setCAModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openCAModal = () => setCAModalOpen(true);
  const closeCAModal = () => setCAModalOpen(false);

  return (
    <div>
      <motion.div
        className={`bg-teal-800 text-white h-full fixed top-0 transition-all duration-300 z-10 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 bg-white text-teal-800 px-2 py-1 rounded"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-5 h-5" />
          ) : (
            <Bars3Icon className="w-5 h-5" />
          )}
        </button>

        <nav className="mt-12">
          <ul className="space-y-4">
            <li className="hover:bg-teal-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="/CA/mined" className="text-lg font-semibold">
                  Overview
                </Link>
              ) : (
                <HomeIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li
              onClick={openCAModal}
              className="hover:bg-teal-700 rounded flex items-center p-2 cursor-pointer"
            >
              {isSidebarOpen ? (
                <span className="text-lg font-semibold">
                  Create Certificate
                </span>
              ) : (
                <ShieldCheckIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
            <li className="hover:bg-teal-700 rounded flex items-center p-2">
              {isSidebarOpen ? (
                <Link to="/CA" className="text-lg font-semibold">
                  View Certificates
                </Link>
              ) : (
                <ClipboardDocumentIcon className="w-6 h-6 mx-auto" />
              )}
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Create CA Modal */}
      {isCAModalOpen && (
        <CAModal isOpen={isCAModalOpen} onClose={closeCAModal} />
      )}
    </div>
  );
};

export default SidebarCA;
