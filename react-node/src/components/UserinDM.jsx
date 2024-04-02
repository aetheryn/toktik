import React from "react";

const UserinDM = (props) => {
  return (
    <div
      style={{
        display: "inline-flex",
        backgroundColor: "#c60060",
        height: "70px",
        width: "360px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          borderRadius: "50px",
          height: "50px",
          width: "50px",
        }}
      ></div>
      <div
        style={{ overflow: "hidden", textAlign: "left", paddingLeft: "20px" }}
      >
        <div style={{ fontWeight: "700" }}>{props.user}</div>
        <div style={{ fontSize: "x-small" }}>Last text message</div>
      </div>
    </div>
  );
};

export default UserinDM;
