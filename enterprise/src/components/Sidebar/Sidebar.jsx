import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import React from 'react';
import { Link } from 'react-router-dom';
import SidebarData from './SidebarData';

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
                        {SidebarData.map(({ to, label, icon }) => (
                            <Link key={to} exact to={to} activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon={icon}>{label}</CDBSidebarMenuItem>
                            </Link>
                        ))}
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;
