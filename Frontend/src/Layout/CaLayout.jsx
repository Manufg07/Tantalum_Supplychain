import React from 'react'
import { Outlet } from 'react-router-dom';
import SidebarCA from '../components/sidebarCA';

const CaLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarCA/>
      <div className="flex-grow p-6 ml-64 overflow-y-auto">
        <Outlet/>
      </div>
    </div>
  );
}

export default CaLayout