import React from "react";

const Container = () => {
  return (
    <div
      className="centered"
      style={{
        display: "grid",
        backgroundColor: "black",
        height: "640px",
        width: "360px",
        borderRadius: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "1em",
          alignSelf: "flex-start",
          marginTop: "30px",
        }}
      >
        Direct Messages
      </h1>
    </div>
  );
};

export default Container;
