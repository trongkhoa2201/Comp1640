import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AccountInDepartment from '../pages/ManageAccount/AccountInDepartment';

import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.js';
import Login from '../pages/Login';
import CreateNewAccount from '../pages/ManageAccount/CreateNewAccount';
import EditAccount from '../pages/ManageAccount/EditUser';
import ManageAccount from '../pages/ManageAccount/ListAccount';
import CreateCategory from '../pages/ManageCategory/CreateCategory';
import EditCategory from '../pages/ManageCategory/EditCategory';
import ManageCategory from '../pages/ManageCategory/ListCategory';
import CreateDepartment from '../pages/ManageDepartment/CreateDepartment';
import ManageDepartment from '../pages/ManageDepartment/ListDepartment';
import EditDepartment from '../pages/ManageDepartment/UpdateDepartment';
import CreateTopic from '../pages/ManageTopic/CreateTopic';
import EditTopic from '../pages/ManageTopic/EditTopic';
import ManagePost from '../pages/ManagePost/ListPost';
import CreateNewPost from '../pages/ManagePost/CreateNewPost';
import StatusDetails from '../pages/ManagePost/PostDetail';
import MyPost from '../pages/ManagePost/MyPost';
import PostOfUser from '../pages/ManagePost/PostOfUser';
import Dashboard from '../pages/Dashboard/Dashboard';
import ManageTopic from '../pages/ManageTopic/ListTopic';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />

            <Route path="/manageAccount" element={<ManageAccount />} />
            <Route path="/manageCategory" element={<ManageCategory />} />
            <Route path="/manageDepartment" element={<ManageDepartment />} />
            <Route path="/manageTopic" element={<ManageTopic />} />
            <Route path="/managePost" element={<ManagePost />} />
            <Route path="/myPost" element={<MyPost />} />
            <Route path="/posts/list/:id" element={<PostOfUser />} />
            <Route path="/qac/myDepartment" element={<AccountInDepartment />} />

            <Route path="/createAccount" element={<CreateNewAccount />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            <Route path="/createDepartment" element={<CreateDepartment />} />
            <Route path="/createTopic" element={<CreateTopic />} />
            <Route path="/user/:id" element={<EditAccount />} />
            <Route path="/categories/:id" element={<EditCategory />} />
            <Route path="/departments/:id" element={<EditDepartment />} />
            <Route path="/topics/:id" element={<EditTopic />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default Routers;
