import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ManageAccount from '../pages/ManageAccount/ListAccount';
import CreateNewAccount from '../pages/ManageAccount/CreateNewAccount';
import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.jsx';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../components/QandA/Main/Main';
import Question from '../components/QandA/Add-Question/Question.js';
import EditAccount from '../pages/ManageAccount/EditUser';
import ManageCategory from '../pages/ManageCategory/ListCategory';
import Category from '../components/QandA/QAManager/Category';
import CreateCategory from '../pages/ManageCategory/CreateCategory';
import ManageDepartment from '../pages/ManageDepartment/ListDepartment';
import ManageTopic from '../pages/ManageTopic/ListTopic';
import EditCategory from '../pages/ManageCategory/EditCategory';
import CreateDepartment from '../pages/ManageDepartment/CreateDepartment';
import EditDepartment from '../pages/ManageDepartment/UpdateDepartment';
import CreateTopic from '../pages/ManageTopic/CreateTopic';
import EditTopic from '../pages/ManageTopic/EditTopic';

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
            {/* <Route path="/category" element={<Category />} /> */}
        </Routes>
    );
};

export default Routers;
