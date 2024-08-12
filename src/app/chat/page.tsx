"use client";
import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./components/NavBar";
import ChatBox from "./components/Chatbox";
import Welcome from "./components/Welcome";

const Chat: React.FC = () => {
  const [user] = useAuthState(auth);
  console.log('firstuser', user)
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#1c2c4c",
        color: "#4c768d",
        paddingTop: "60px",
      }}
    >
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
          <ChatBox />
        </>
      )}
    </div>
  );
};

export default Chat;
