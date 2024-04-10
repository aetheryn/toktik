import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DirectMessage from "./pages/DirectMessage";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import ContentModerator from "./pages/ContentModerator";
import UserContext from "./context/user";
import SocketContext from "./context/SocketContext";
import io from "socket.io-client";
import useFetch from "./hooks/useFetch";
import { jwtDecode } from "jwt-decode";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const fetchData = useFetch();

  useEffect(() => {
    if (username) {
      const socket = io(import.meta.env.VITE_SERVER, {
        query: { userId: username },
      });

      setSocket(socket);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [username]);

  const access = async () => {
    const refreshToken = localStorage.getItem("refresh");

    if (refreshToken) {
      const res = await fetchData(
        "/auth/refresh",
        "POST",
        {
          refresh: refreshToken,
        },
        undefined
      );
      if (res.ok) {
        setAccessToken(res.data.access);
        const decoded = jwtDecode(res.data.access);
        setRole(decoded.role);
        setUsername(decoded.username);
        setProfilePic(decoded.profilePicture);
      }
    }
  };

  useEffect(() => {
    access();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          username,
          setUsername,
          profilePic,
          setProfilePic,
          selectedUser,
          setSelectedUser,
        }}
      >
        <SocketContext.Provider
          value={{
            socket,
            setSocket,
            // onlineUsers,
            // setOnlineUsers,
          }}
        >
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Navigate replace to="/main" />} />
            <Route path="main" element={<HomePage></HomePage>} />
            <Route path="login" element={<LoginPage></LoginPage>} />
            <Route path="register" element={<RegisterPage></RegisterPage>} />
            <Route path="dm" element={<DirectMessage></DirectMessage>} />
            <Route path="dm" element={<DirectMessage />} />
            <Route path="profile/:currentUser" element={<Profile />} />
            <Route path="upload" element={<Upload />} />
            <Route path="cm" element={<ContentModerator />} />
          </Routes>
        </SocketContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
