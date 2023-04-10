import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ManageAccount from '../pages/ManageAccount/ListAccount';
import CreateNewAccount from '../pages/ManageAccount/CreateNewAccount';
import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.jsx';
import Login from '../pages/Login';
import EditAccount from '../pages/ManageAccount/EditUser';
import ManageCategory from '../pages/ManageCategory/ListCategory';
import CreateCategory from '../pages/ManageCategory/CreateCategory';
import ManageDepartment from '../pages/ManageDepartment/ListDepartment';
import ManageTopic from '../pages/ManageTopic/ListTopic';
import EditCategory from '../pages/ManageCategory/EditCategory';
import CreateDepartment from '../pages/ManageDepartment/CreateDepartment';
import EditDepartment from '../pages/ManageDepartment/UpdateDepartment';
import CreateTopic from '../pages/ManageTopic/CreateTopic';
import EditTopic from '../pages/ManageTopic/EditTopic';

import NewPost from '../components/Post/NewPost';
import ManagePost from '../pages/ManagePost/ListPost';
import CreateNewPost from '../pages/ManagePost/CreateNewPost';

// import EditPost from '../pages/ManagePost/EditPost';
// import DetailPost from '../pages/ManagePost/DetailPost';
import StatusDetails from '../pages/ManagePost/PostDetail';
import Dashboard from '../pages/Dashboard/Dashboard';


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
            <Route path="/createAccount" element={<CreateNewAccount />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            <Route path="/createDepartment" element={<CreateDepartment />} />
            <Route path="/createTopic" element={<CreateTopic />} />
            <Route path="/createPost" element={<CreateNewPost />} />
            <Route path="/user/:id" element={<EditAccount />} />
            <Route path="/categories/:id" element={<EditCategory />} />
            <Route path="/departments/:id" element={<EditDepartment />} />
            <Route path="/topics/:id" element={<EditTopic />} />
            {/* <Route path="/posts/:id" element={<DetailPost />} /> */}
            <Route path="/posts/:id" element={<StatusDetails />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            {/* ======================= */}
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default Routers;
