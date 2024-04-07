import React, { useContext, useEffect, useState, useRef } from "react";
import Chat from "../components/Chat";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import UserinDM from "../components/UserinDM";
import styles from "../components/DM.module.css";
import SearchIcon from "@mui/icons-material/Search";

const DirectMessage = () => {
  const userCtx = useContext(UserContext);
  const searchRef = useRef();
  const fetchMessages = useFetch();
  const fetchProfile = useFetch();
  const [allMessages, setAllMessages] = useState([]);
  const [usersInDMs, setUsersInDMs] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(userCtx.username);

  const getAllMessages = async () => {
    try {
      const response = await fetchMessages(
        `/messages/${loggedInUser}`,
        "POST",
        undefined,
        undefined
      );

      console.log(response);
      if (response.ok) {
        const data = [...response.data];
        data.reverse();

        setAllMessages(data);
        console.log(data);
        getUsersInDMs(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const getUsersInDMs = (messages) => {
    const usersInConv = [];

    messages.map((message) => {
      console.log(message.sender_id);
      usersInConv.push(message.sender_id);
      console.log(message.receiver_id);
      usersInConv.push(message.receiver_id);
      console.log(usersInConv);
    });

    const uniqueUsers = [...new Set(usersInConv)];
    uniqueUsers.splice(uniqueUsers.indexOf(loggedInUser), 1);

    console.log(uniqueUsers);
    setUsersInDMs(uniqueUsers);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const username = searchRef.current.value;
    try {
      const response = await fetchProfile(
        "/users/",
        "GET",
        undefined,
        undefined
      );

      if (response.ok) {
        if (response.data.find((user) => user.username === username)) {
          handleUserSelect(username);
          searchRef.current.value = "";
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="row" style={{ width: "95vw", margin: "auto" }}>
      <div className={`${styles.container} col-3`}>
        <h1>Direct Messages</h1>
        <div
          className={styles.searchUser}
          onClick={() => setShowSearchBar(false)}
        >
          <input
            placeholder="Start a DM with Toktik User"
            ref={searchRef}
            onKeyDown={handleKeyDown}
          ></input>
          <button onClick={() => handleSearch()}>
            <SearchIcon style={{ width: "80%" }}></SearchIcon>
          </button>
        </div>
        {usersInDMs.map((user) => {
          return (
            <UserinDM
              user={user}
              allMessages={allMessages}
              handleUserSelect={handleUserSelect}
            ></UserinDM>
          );
        })}
      </div>
      <div className={`${styles.container} col`}>
        {showChat && (
          <Chat
            selectedUser={selectedUser}
            loggedInUser={loggedInUser}
            allMessages={allMessages}
            getAllMessages={getAllMessages}
          ></Chat>
        )}
      </div>
    </div>
  );
};

export default DirectMessage;
