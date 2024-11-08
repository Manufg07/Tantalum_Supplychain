import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import MiningLayout from "./Layout/MiningLayout";
import MiningCompanyDashboard from "./components/MiningCompanyDashboard";
import Overview from "./components/OverView";
import RegisterOre from "./components/RegisterOre";
import ViewRegisteredOre from "./components/ViewRegisteredOre";
import PrivateOreDetails from "./components/PrivateOreDetails";
import LandingPage from "./components/LandingPage";
import RefiningDashboard from "./components/RefiningDashboard";
import RefiningLayout from "./Layout/RefiningLayout";
import ViewProcessedOre from "./components/ViewProcessedOre";
import ManufacturingLayout from "./Layout/ManufacturingLayout";
import ManufacturingDashboard from "./components/ManufacturingDashboard";
import ViewComponent from "./components/ViewComponent";
import CaLayout from "./Layout/CaLayout";
import CADashboard from "./components/CADashboard";
import ViewCA from "./components/ViewCA";
import ViewMinedOres from "./components/ViewMinedOres";
import AddPrivateOreDetails from "./components/AddPrivateOreDetails";
import Viewwithpvt from "./components/Viewwithpvt";
import ViewCertifiedOres from "./components/ViewCertifiedOres";
import OreHistory from "./components/OreHistory";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/Land" element={<LandingPage />}></Route>

        <Route path="/" element={<MiningLayout />}>
          <Route path="Dash" element={<MiningCompanyDashboard />} />
          <Route path="Dash/history" element={<OreHistory/>} />
          <Route path="Dash/Pvt" element={<AddPrivateOreDetails />} />
          <Route path="Dash/registerOre" element={<RegisterOre />} />
          <Route path="Dash/viewOre" element={<ViewRegisteredOre />} />
          <Route path="Dash/privateOre" element={<Viewwithpvt />} />
        </Route>

        <Route path="/" element={<RefiningLayout />}>
          <Route path="/Refinedash" element={<RefiningDashboard />} />
          <Route path="/Refinedash/view" element={<ViewProcessedOre />} />
          <Route path="/Refinedash/certified" element={<ViewCertifiedOres />} />
        </Route>

        <Route path="/" element={<ManufacturingLayout />}>
          <Route path="/Manu" element={<ManufacturingDashboard />} />
          <Route path="/Manu/" element={<ViewCertifiedOres />} />
          <Route path="/Manu/view" element={<ViewComponent />} />
        </Route>

        <Route path="/" element={<CaLayout />}>
          <Route path="/CA" element={<CADashboard />} />
          <Route path="/CA/mined" element={<ViewMinedOres />} />
          <Route path="/CA/view" element={<ViewCA />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
