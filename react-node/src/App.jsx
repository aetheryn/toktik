import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DirectMessage from "./pages/DirectMessage";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";

function App() {
  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="main" element={<HomePage></HomePage>} />
        <Route path="auth" element={<LoginPage></LoginPage>} />
        <Route path="dm" element={<DirectMessage></DirectMessage>} />
        <Route path="profile" element={<Profile></Profile>} />
        <Route path="upload" element={<Upload></Upload>} />
      </Routes>
    </>
  );
}

export default App;
