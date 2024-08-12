"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

// Define a type for message data
interface MessageData {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  user: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const fetchedMessages: MessageData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id } as MessageData);
        });
        const sortedMessages = fetchedMessages.sort(
          (a, b) => a.createdAt.seconds - b.createdAt?.seconds
        );
        setMessages(sortedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#1c2c4c",
        color: "#4c768d",
        paddingTop: "60px",
      }}
    >
      <div
        style={{
          padding: "30px",
          marginBottom: "60px",
        }}
      >
        {messages?.map((message) => (
          <Message key={message.id} message={message as any} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
