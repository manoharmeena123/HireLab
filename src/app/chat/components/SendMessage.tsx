"use client";
import React, { useState, FormEvent, RefObject } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Define the props type
interface SendMessageProps {
  scroll: RefObject<HTMLSpanElement>;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll }) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    if (!auth.currentUser) {
      alert("No user is signed in");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage("");
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={sendMessage}
      style={{
        // position: "fixed",
        bottom: 0,
        width: "100%",
        padding: "20px 30px",
        backgroundColor: "#4c768d",
        display: "flex",
      }}
    >
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          height: "40px",
          padding: "10px",
          borderRadius: "5px 0 0 5px",
          border: "none",
          flexGrow: 1,
          backgroundColor: "white",
          color: "#1c2c4c",
          fontSize: "1rem",
        }}
      />
      <button
        type="submit"
        style={{
          width: "70px",
          height: "40px",
          padding: "5px 10px",
          borderRadius: "0 5px 5px 0",
          color: "#242443",
          border: "1px solid #7cc5d9",
          backgroundColor: "#7cc5d9",
          fontWeight: 600,
        }}
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
