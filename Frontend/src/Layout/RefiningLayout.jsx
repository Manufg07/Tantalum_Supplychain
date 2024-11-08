import React from 'react'
import SidebarRefining from '../components/SidebarRefining';
import { Outlet } from 'react-router-dom';

const RefiningLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarRefining/>
      <div className="flex-grow p-6 ml-64 overflow-y-auto">
        <Outlet/>
      </div>
    </div>
  );
}

export default RefiningLayout