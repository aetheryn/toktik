import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import useFetch from "../hooks/useFetch";
import UserinDM from "../components/UserinDM";

const DirectMessage = () => {
  const fetchMessages = useFetch();
  const [allMessages, setAllMessages] = useState([]);
  const [usersInDMs, setUsersInDMs] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showChat, setShowChat] = useState(false);

  const loggedInUser = "Bryan";
  let senders;
  let receivers;

  const checkSenders = (messages) => {
    senders = [...new Set(messages.map((message) => message.sender_id))];
    console.log(senders);
    return senders;
  };
  const checkReceivers = (messages) => {
    receivers = [...new Set(messages.map((message) => message.receiver_id))];
    console.log(receivers);
    return receivers;
  };

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
    checkSenders(messages);
    checkReceivers(messages);

    const usersEngaged = senders.concat(
      receivers.filter(
        (receiver) => !senders.some((sender) => sender === receiver)
      )
    );
    usersEngaged.splice(usersEngaged.indexOf(loggedInUser), 1);
    console.log(usersEngaged);
    setUsersInDMs(usersEngaged);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <div className="row">
      <div className="col-1"></div>
      <div
        className="col-3 centered"
        style={{
          backgroundColor: "black",
          height: "640px",
          width: "360px",
          borderRadius: "30px",
          display: "block",
          paddingLeft: "-1.5rem",
        }}
      >
        <h1
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            fontSize: "1em",
          }}
        >
          Direct Messages
        </h1>

        {usersInDMs.map((user) => {
          return (
            <UserinDM
              user={user}
              handleUserSelect={handleUserSelect}
            ></UserinDM>
          );
        })}
      </div>
      <div
        className="col centered"
        style={{
          backgroundColor: "black",
          height: "640px",
          borderRadius: "30px",
          display: "block",
          marginLeft: "10px",
        }}
      >
        {showChat && <Chat selectedUser={selectedUser}></Chat>}
      </div>

      <div className="col-1"></div>
    </div>
  );
};

export default DirectMessage;
