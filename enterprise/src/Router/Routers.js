import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Question from "../components/QandA/Add-Question/Question.js";
import Main from "../components/QandA/Main/Main";
import CRUD from "../pages/CRUD";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login";
import Profile from "../pages/Profile.jsx";
import Signup from "../pages/Signup";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/crud" element={<CRUD />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/question" element={<Main />} />
      <Route path="/add-question" element={<Question />} />
    </Routes>
  );
};

export default Routers;
