import { createContext, useContext, useEffect, useState, React } from "react";
import UserContext from "../context/user";
import io from "socket.io-client";

export default createContext();
