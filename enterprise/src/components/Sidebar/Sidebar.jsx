import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SidebarData from './SidebarData';
import { Store } from '../../Store';

const Sidebar = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#000">
                {/* ===================== Header ===================== */}

                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                {userInfo ? (<a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                        {userInfo.name}
                        <br />
                        Role: {userInfo.role}
                    </a>):(<a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Logo
                        <br />
                        Role: None
                    </a>)}
                    
                </CDBSidebarHeader>

                {/* ===================== Content ===================== */}

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        {SidebarData.map(({ to, label, icon }) => (
                            <Link key={to} to={to}>
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
