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
    const ForAdmin = [
        { to: '/home', label: 'Home', icon: 'home' },
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
        { to: '/managePost', label: 'Manage Post', icon: 'file' },
        { to: '/profile', label: 'Profile page', icon: 'user' },
    ];
    const ForQAC = [
        { to: '/home', label: 'Home', icon: 'home' },
        { to: '/manageDepartment', label: 'Manage Department', icon: 'building' },
        { to: '/managePost', label: 'Manage Post', icon: 'file' },
        { to: '/profile', label: 'Profile page', icon: 'user' },
    ];
    const ForStaff = [
        { to: '/home', label: 'Home', icon: 'home' },
        { to: '/managePost', label: 'Manage Post', icon: 'file' },
        { to: '/profile', label: 'Profile page', icon: 'user' },
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
                        </a>
                    ) : (
                        <a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
                            Logo
                            <br />
                            Role: None
                        </a>
                    )}
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
