import React from "react";
import Routers from "../../Router/Routers";
import Navbar from "../Navbar/Navbar.jsx";
import Sidebar from "../Sidebar/Sidebar";
import"../Layouts/Layout.css"


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
        <Navbar />
        <div className="">
         
        </div>
        <Routers />
      </div>
    </div>
  );
};

export default Layout;
