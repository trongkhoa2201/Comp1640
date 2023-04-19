import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SidebarData from './SidebarData';
import { Store } from '../../Store';

const Sidebar = () => {
    const ForAdmin = [
        // { to: '/home', label: 'Home', icon: 'home' },
        { to: '/dashboard', label: 'Dashboard', icon: 'home' },
        { to: '/myPost', label: 'My Post', icon: 'file' },
        { to: '/manageAccount', label: 'Manage Account', icon: 'table' },
        { to: '/manageCategory', label: 'Manage Category', icon: 'list' },
        { to: '/manageDepartment', label: 'Manage Department', icon: 'building' },
        { to: '/manageTopic', label: 'Manage Topic', icon: 'lightbulb' },
        { to: '/managePost', label: 'Manage Post', icon: 'file' },
        { to: '/profile', label: 'Profile page', icon: 'user' },
    ];
    const ForQAM = [
        { to: '/home', label: 'Home', icon: 'home' },
        { to: '/manageCategory', label: 'Manage Category', icon: 'list' },
        { to: '/manageTopic', label: 'Manage Topic', icon: 'lightbulb' },
        { to: '/myPost', label: 'My Post', icon: 'file' },
        { to: '/profile', label: 'Profile page', icon: 'user' },
    ];
    const ForQAC = [
        { to: '/home', label: 'Home', icon: 'home' },
        { to: '/qac/myDepartment', label: 'My Department', icon: 'table' },
        { to: '/myPost', label: 'My Post', icon: 'file' },
        { to: '/profile', label: 'Profile page', icon: 'user' },
    ];
    const ForStaff = [
        { to: '/home', label: 'Home', icon: 'home' },
        { to: '/myPost', label: 'My Post', icon: 'file' },
        { to: '/profile', label: 'Profile Page', icon: 'user' },
    ];
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#000">
                {/* ===================== Header ===================== */}

                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    {userInfo ? (
                        <a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                            {userInfo.name}
                            <br />
                            Role: {userInfo.role}
                            <br />
                            {userInfo.department}
                        </a>
                    ) : (
                        <a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                            Logo
                            <br />
                            Role: None
                            <br />
                            Department: None
                        </a>
                    )}
                </CDBSidebarHeader>

                {/* ===================== Content ===================== */}

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        {userInfo && userInfo.role === 'admin' ? (
                            <>
                                {ForAdmin.map(({ to, label, icon }) => (
                                    <Link key={to} to={to}>
                                        <CDBSidebarMenuItem icon={icon}>{label}</CDBSidebarMenuItem>
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <>
                                {userInfo && userInfo.role === 'qam' ? (
                                    <>
                                        {ForQAM.map(({ to, label, icon }) => (
                                            <Link key={to} to={to}>
                                                <CDBSidebarMenuItem icon={icon}>{label}</CDBSidebarMenuItem>
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {userInfo && userInfo.role === 'qac' ? (
                                            <>
                                                {ForQAC.map(({ to, label, icon }) => (
                                                    <Link key={to} to={to}>
                                                        <CDBSidebarMenuItem icon={icon}>{label}</CDBSidebarMenuItem>
                                                    </Link>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {ForStaff.map(({ to, label, icon }) => (
                                                    <Link key={to} to={to}>
                                                        <CDBSidebarMenuItem icon={icon}>{label}</CDBSidebarMenuItem>
                                                    </Link>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {userInfo ? (
                            <NavLink onClick={signoutHandler}>
                                <CDBSidebarMenuItem icon="power-off">Log Out</CDBSidebarMenuItem>
                            </NavLink>
                        ) : (
                            <NavLink to="/login">
                                <CDBSidebarMenuItem icon="power-off">Log In</CDBSidebarMenuItem>
                            </NavLink>
                        )}
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;
