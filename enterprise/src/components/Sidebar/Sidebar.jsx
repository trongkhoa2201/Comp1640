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
import SidebarData from "./SidebarData";

const Sidebar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#000">
                {/* ===================== Header ===================== */}

                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                        LOGO
                    </a>
                </CDBSidebarHeader>

                {/* ===================== Content ===================== */}

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
<<<<<<< HEAD
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
            <Link exact to="/question" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="question">
                Question
              </CDBSidebarMenuItem>
            </Link>
            <Link exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="power-off">Log Out</CDBSidebarMenuItem>
            </Link>
=======
            {SidebarData.map(({ to, label, icon }) => (
              <Link key={to} exact to={to} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon={icon}>{label}</CDBSidebarMenuItem>
              </Link>
            ))}
>>>>>>> b961eb7b186570774f4a68c592d3b6aeabbc07a3
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
