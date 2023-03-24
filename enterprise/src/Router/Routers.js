import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import CRUD from "../pages/CRUD";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Main from '../components/QandA/Main/Main';
import Question from "../components/QandA/Add-Question/Question.js";
/*import { Admin, Resource } from 'react-admin'
import { listCategory, editCategory, createCategory } from './enterprise/src/components/QandA/QAManager/Category'
import User from './enterprise/src/components/QandA/QAManager/Users'*/
import { Category } from "@mui/icons-material";
import MainQuestion from "../components/QandA/ViewQuestion/MainQuestion";

 


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/crud" element={<CRUD />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>     
      <Route path='/question' element={<Main/>}/>
      <Route path='/add-question' element={<Question/>}/>
      <Route path='/view-question' element={<MainQuestion/>}/>
      <Route path='/category' element={<Category/>}/>
    </Routes>
  );
};

export default Routers;
