"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import the Image component from Next.js
import styles from "./ChatList.module.css"; // Import the CSS module
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import minus from '@/images/chat/minus.png';
import plus from '@/images/chat/plus.png';
import search from '@/images/chat/search.png';
import avatar from '@/images/chat/avatar.png'

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser?.id) return; // Check if currentUser is defined

    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats || []; // Fallback to empty array if chats is undefined

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]); // Add check for currentUser.id

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className={styles.chatList}>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <Image src={search} alt="Search" width={20} height={20} />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <Image
          src={addMode ? minus : plus}
          alt="Add/Remove User"
          className={styles.add}
          onClick={() => setAddMode((prev) => !prev)}
          width={36}
          height={36}
        />
      </div>
      {filteredChats.map((chat) => (
        <div
          className={styles.item}
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <Image
            src={
              chat.user.blocked.includes(currentUser.id)
                ? avatar
                : chat.user.avatar || avatar
            }
            alt="User Avatar"
            width={50}
            height={50}
            className={styles.avatar}
          />
          <div className={styles.texts}>
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
