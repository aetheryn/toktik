import React, { useEffect, useState } from "react";
import DMList from "../components/DMList";
import Chat from "../components/Chat";
import useFetch from "../hooks/useFetch";

const DirectMessage = () => {
  const fetchMessages = useFetch();
  const [allMessages, setAllMessages] = useState([]);
  const [usersInDMs, setUsersInDMs] = useState([]);

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
        setAllMessages(response.data);
        getUsersInDMs(response.data);
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

  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col-3">
        <DMList allMessages={allMessages} usersInDMs={usersInDMs}></DMList>
      </div>
      <div className="col">
        <Chat allMessages={allMessages} usersInDMs={usersInDMs}></Chat>
      </div>
      <div className="col-1"></div>
    </div>
  );
};

export default DirectMessage;
