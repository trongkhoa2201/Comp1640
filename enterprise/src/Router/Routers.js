import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import  CreatePost  from "../components/CreatePost/CreatePost";

import CRUD from "../pages/CRUD.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
 


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/crud" element={<CRUD />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create_post" element={<CreatePost />} />
    </Routes>
  );
};

export default Routers;
