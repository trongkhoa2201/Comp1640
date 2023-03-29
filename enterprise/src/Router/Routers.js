import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ManageAccount from '../pages/ManageAccount/ListAccount';
import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.jsx';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../components/QandA/Main/Main';
import Question from "../components/QandA/Add-Question/Question.js";
import ManageCategory from "../pages/ManageCategory/ListCategory";
import CreateNewAccount from '../pages/CreateNewAccount/CreateNewAccount.js'
import EditAccount from '../pages/EditAccount/EditAccount.js'
import Category from "../pages/Category/ListCategory";


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/manageAccount" element={<ManageAccount />} />
            <Route path="/manageCategory" element={<ManageCategory />} />
            <Route path="/createAccount" element={<CreateNewAccount />} />
            <Route path="/user/:id" element={<EditAccount />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/question" element={<Main />} />
            <Route path="/add-question" element={<Question />} />
            <Route path="/category" element={<Category />} />
        </Routes>
    );
};

export default Routers;
