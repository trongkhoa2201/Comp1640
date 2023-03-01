import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CRUD from "../Page/CRUD.jsx";
import Home from "../Page/Home.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/crud" element={<CRUD />} />
    </Routes>
  );
};

export default Routers;
