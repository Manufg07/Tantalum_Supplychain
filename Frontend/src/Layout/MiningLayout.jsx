import React from 'react'
import SidebarMining from '../components/SidebarMining';
import { Outlet } from 'react-router-dom';


const MiningLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarMining />
      <div className="flex-grow p-6 ml-64 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MiningLayout;