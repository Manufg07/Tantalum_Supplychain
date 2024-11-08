import React from 'react'
import { Outlet } from 'react-router-dom';
import SidebarManufacturing from '../components/SidebarManufacturing';

const ManufacturingLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarManufacturing/>
      <div className="flex-grow p-6 ml-64 overflow-y-auto">
        <Outlet/>
      </div>
    </div>
  );
}

export default ManufacturingLayout