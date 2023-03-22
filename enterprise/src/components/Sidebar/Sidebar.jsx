import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#000">
        {/* ===================== Header ===================== */}

        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/home"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            LOGO
          </a>
        </CDBSidebarHeader>

        {/* ===================== Content ===================== */}

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Link exact to="/home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </Link>
            <Link exact to="/crud" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Create Account
              </CDBSidebarMenuItem>
            </Link>
            <Link exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </Link>
            <Link exact to="/User" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">QA Manager </CDBSidebarMenuItem>
            </Link>
            <Link exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="power-off">Log Out</CDBSidebarMenuItem>
            </Link>

          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
