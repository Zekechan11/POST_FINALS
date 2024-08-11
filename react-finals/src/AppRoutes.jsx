import Dashboard from "./Dashboard";
import Historys from "./History";

import { Route, Routes } from "react-router-dom";
import Inventory from "./inventory";
function AppRoutes() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<Inventory />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/History" element={<Historys/>} />
        </Routes>
      </div>
    </>
  );
}

export default AppRoutes;
