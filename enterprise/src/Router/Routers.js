import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import CRUD from "../Page/CRUD.jsx";
import Home from "../Page/Home.jsx";
import Profile from "../Page/Profile.jsx";
import Login from '../Page/Login'
import Signup from '../Page/Signup'
import Main from '../components/QandA/Main/Main';
import Question from "../components/QandA/Add-Question/Question.js";


 


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
    </Routes>
  );
};

export default Routers;
