import React, { useEffect } from "react";
import UserinDM from "./UserinDM";

const DMList = (props) => {
  return (
    <div
      className="centered"
      style={{
        display: "grid",
        backgroundColor: "black",
        height: "640px",
        width: "360px",
        borderRadius: "30px",
        alignContent: "flex-start",
        paddingTop: "10px",
      }}
    >
      <div className="row" style={{ height: "70px", alignContent: "center" }}>
        <h1
          style={{
            fontSize: "1em",
          }}
        >
          Direct Messages
        </h1>
      </div>

      {props.usersInDMs.map((user) => {
        return (
          <li
            className="row"
            style={{ height: "70px", alignContent: "center" }}
          >
            <UserinDM user={user}></UserinDM>
          </li>
        );
      })}
    </div>
  );
};

export default DMList;
