"use client";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Define a type for the message prop
interface MessageProps {
  message: {
    uid: string;
    avatar: string;
    name: string;
    text: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [user] = useAuthState(auth);

  const isUserMessage = message.uid === user?.uid;

  return (
    <div
      style={{
        borderRadius: isUserMessage ? "20px 20px 0 20px" : "20px 20px 20px 0",
        padding: "15px",
        backgroundColor: isUserMessage ? "#fff" : "#7cc5d9",
        color: "#1c2c4c",
        width: "max-content",
        maxWidth: "calc(100% - 50px)",
        boxShadow: `-2px 2px 1px 1px ${
          isUserMessage ? "#88dded" : "#4c768d"
        }`,
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "20px",
        marginLeft: isUserMessage ? "auto" : "0",
      }}
    >
      <img
        src={message.avatar}
        alt="user avatar"
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      <div>
        <p
          style={{
            fontWeight: "bold",
            marginBottom: "5px",
            fontSize: "0.9rem",
            color: "#1c2c4c",
          }}
        >
          {message.name}
        </p>
        <p
          style={{
            wordBreak: "break-all",
          }}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
