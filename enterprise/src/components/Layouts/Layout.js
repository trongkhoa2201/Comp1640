import React from "react";
import Routers from "../../Router/Routers";

import Sidebar from "../Sidebar/Sidebar";
import"../Layouts/Layout.css"
import { Container } from "react-bootstrap";


const Layout = () => {
  return (
    <div
      className="layout"
      style={{ display: "flex", height: "100vh", background: "#e7e7e7" }}
    >
      {/* ===================MENU=================== */}
      <div>
        <Sidebar />
      </div>
      {/* ===================content=================== */}
      <div className="center">
        <Routers />
      </div>
    </div>
  );
};

export default Layout;
