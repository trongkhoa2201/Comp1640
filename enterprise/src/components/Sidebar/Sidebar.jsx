import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
<<<<<<< HEAD
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SidebarData from './SidebarData';
import { Store } from '../../Store';
=======
import React from 'react';
import { Link } from 'react-router-dom';
import SidebarData from './SidebarData';
>>>>>>> e888bcd30f75b73bdfd5d10c83557a594b4ffa1b

const Sidebar = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#000">
                {/* ===================== Header ===================== */}

                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                        {userInfo.name}
                        <br />
                        Role: {userInfo.role}
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
