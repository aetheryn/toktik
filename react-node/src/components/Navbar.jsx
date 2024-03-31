import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header style={{ backgroundColor: "black" }}>
      <div
        className="row"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <Link
          className="col"
          style={{ color: "white", paddingLeft: "50px" }}
          to="/main"
        >
          Logo
        </Link>

        <div className="col" style={{ paddingRight: "50px" }}>
          <Link style={{ float: "right", marginLeft: "10px" }} to="/profile">
            Profile
          </Link>

          <Link style={{ float: "right", marginLeft: "10px" }} to="/dm">
            DM
          </Link>

          <Link style={{ float: "right", marginLeft: "10px" }} to="/upload">
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
