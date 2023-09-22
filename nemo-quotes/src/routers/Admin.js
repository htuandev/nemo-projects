import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Manage from "../pages/Manage";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import Login from "../pages/Login";

export default function Admin() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<Manage />} />
        <Route path="add" element={<Add />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
      <Footer display="none" />
    </>
  );
}
