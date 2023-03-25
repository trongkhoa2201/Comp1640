import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import CRUD from "../pages/CRUD";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Main from '../components/QandA/Main/Main';
import Question from "../components/QandA/Add-Question/Question.js";
import { Category } from "@mui/icons-material";
import MainQuestion from "../components/QandA/ViewQuestion/MainQuestion";
import {Card} from "../components/LikeNotify/Card";
 


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
      <Route path='/card' element={<Card/>}/>
    </Routes>
  );
};

export default Routers;
