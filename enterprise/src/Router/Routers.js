import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Question from '../components/QandA/Add-Question/Question.js';
import Main from '../components/QandA/Main/Main';
import Home from '../pages/Home.jsx';
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
import ManageTopic from '../pages/ManageTopic/ListTopic';
import Profile from '../pages/Profile.jsx';
import Signup from '../pages/Signup';
import Post from '../pages/PostManage/Post/Post';
import PostDetail from '../pages/PostManage/PostDetail/PostDetail';
import PostCreate from '../pages/PostManage/PostCreate/PostCreate';


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/manageAccount" element={<ManageAccount />} />
            <Route path="/manageCategory" element={<ManageCategory />} />
            <Route path="/manageDepartment" element={<ManageDepartment />} />
            <Route path="/manageTopic" element={<ManageTopic />} />
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
            <Route path="/signup" element={<Signup />} />
            <Route path="/question" element={<Main />} />
            <Route path="/add-question" element={<Question />} />

            {/* ======================= */}

           
        </Routes>
    );
};

export default Routers;
