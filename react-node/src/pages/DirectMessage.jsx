import React from "react";
import DMList from "../components/DMList";
import Chat from "../components/Chat";

const DirectMessage = () => {
  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col-3">
        <DMList></DMList>
      </div>
      <div className="col">
        <Chat></Chat>
      </div>
      <div className="col-1"></div>
    </div>
  );
};

export default DirectMessage;
