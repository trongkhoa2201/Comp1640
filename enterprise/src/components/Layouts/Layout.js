import React from "react";
import Navbar from "../Navbar/Navbar.jsx"
import Routers from "../../Router/Routers";
import Sidebar from "../Sidebar/Sidebar";
import { Container, Row } from "react-bootstrap";

const Layout = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Navbar />
          <Routers />
        </div>
      </div>
    </div>
  );
};

export default Layout;
