import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DirectMessage from "./pages/DirectMessage";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import UserContext from "./context/user";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <Navbar></Navbar>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          username,
          setUsername,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="main" element={<HomePage></HomePage>} />
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="register" element={<RegisterPage></RegisterPage>} />
          <Route path="dm" element={<DirectMessage></DirectMessage>} />
          <Route path="profile" element={<Profile></Profile>} />
          <Route path="upload" element={<Upload></Upload>} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
