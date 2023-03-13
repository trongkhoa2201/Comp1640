import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import CRUD from "../Page/CRUD.jsx";
import Home from "../Page/Home.jsx";
import Profile from "../Page/Profile.jsx";
import Login from "../Page/Login.js";
import Signup from '../Page/Signup'
 


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/crud" element={<CRUD />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
