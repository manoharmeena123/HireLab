import { useEffect, useState, useRef } from "react";
import Image from "next/image"; // Import the Image component from Next.js
import styles from "./ChatList.module.css"; // Import the CSS module
import { useUserStore } from "../../../lib/userStore";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  collection,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import minus from "@/images/chat/minus.png";
import plus from "@/images/chat/plus.png";
import search from "@/images/chat/search.png";
import avatar from "@/images/chat/avatar.png"; // Default avatar
import { useSearchParams } from "next/navigation";
// import { IMAGE_URL } from "@/lib/apiEndPoints"; // Comment this out for now

// const BASE_IMAGE_URL = "https://thinkdream.in/hirelab/public/images/"; // Comment this out for now

const ChatListWithAddUser = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const email = searchParams.get("email");

  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false); // For toggling AddUser form
  const [input, setInput] = useState(""); // For chat search input
  const [user, setUser] = useState(null); // To hold searched user in AddUser form
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const modalRef = useRef(null); // Ref for the modal content
  console.log("firstuser", user);

  // Fetch user chats when currentUser is set
  useEffect(() => {
    console.log("currentUserfirst", currentUser);
    if (!currentUser?.id) {
      console.error("No current user ID available");
      return;
    }

    const unSub = onSnapshot(
      doc(db, "userchats", currentUser?.id.toString()), // Ensure currentUser.id exists and is a string
      async (res) => {
        const items = res.data()?.chats || [];

        const promises = items?.map(async (item) => {
          const userDocRef = doc(db, "users", item?.receiverId);
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
  }, [currentUser?.id]);

  // Handle selecting a chat
  const handleSelect = async (chat) => {
    console.log("chat", chat);
    setAddMode(false);
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id.toString());
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter the chats based on input and remove duplicates by `user.id`
  const filteredChats = chats
    .filter((c) =>
      c.user.username.toLowerCase().includes(input.toLowerCase())
    )
    .reduce((uniqueChats, currentChat) => {
      const isDuplicate = uniqueChats.some(
        (chat) => chat.user.id === currentChat.user.id
      );
      if (!isDuplicate) {
        uniqueChats.push(currentChat);
      }
      return uniqueChats;
    }, []);
  console.log("filteredChats", filteredChats);

  // Handle user search in AddUser form
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);
      console.log("firstquerySnapShot", querySnapShot);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Check if the user is already added in the chat list
  const isUserAlreadyAdded = () => {
    return chats.some((chat) => chat.user.id === user?.id);
  };

  // Handle adding a new chat with a searched user
  const handleAdd = async () => {
    if (!user || !currentUser || isUserAlreadyAdded()) {
      console.warn("User or currentUser is undefined, or user already added.");
      return;
    }

    const userId = user?.id?.toString();
    const currentUserId = currentUser?.id?.toString();

    if (!userId || !currentUserId) {
      console.error("Invalid user or currentUser ID");
      return;
    }

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      console.log("Adding chat for user ID:", userId);
      console.log("Adding chat for currentUser ID:", currentUserId);

      await updateDoc(doc(userChatsRef, userId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUserId,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUserId), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: userId,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.error("Error adding chat:", err);
    }
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAddMode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.chatList}>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <Image src={search} alt="Search" width={20} height={20} />
          <input
            type="text"
            placeholder="Search Chats"
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

      {/* Render chat list */}
      {filteredChats.map((chat) => (
        <div
          className={styles.item}
          key={chat?.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          
          {/* Always display default avatar for now */}
          <Image
            src={avatar}
            alt="User Avatar"
            width={50}
            height={50}
            className={styles.avatar}
          />

          <div className={styles.texts}>
            <span>
              {chat.user.blocked?.includes(currentUser?.id.toString())
                ? "User"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {/* Add user form if addMode is enabled */}
      {addMode && (
        <div ref={modalRef} className={styles.addUser}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className={styles.input}
            />
            <button className={styles.button}>Search</button>
          </form>
          {user && (
            <div className={styles.user}>
              <div className={styles.detail}>
                {/* Always display default avatar for now */}
                <Image
                  src={avatar}
                  alt="User Avatar"
                  width={50}
                  height={50}
                />
                <span>{user.username}</span>
              </div>
              {isUserAlreadyAdded() ? (
                <p className={styles.alreadyAdded}>
                  User is already added to chats!
                </p>
              ) : (
                <button onClick={handleAdd} className={styles.button}>
                  Add User
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatListWithAddUser;
