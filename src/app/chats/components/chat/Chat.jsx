"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css"; // Import the CSS module
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";
import { format } from "timeago.js";
import Image from "next/image";

// Import your images here
import phoneIcon from "@/images/chat/phone.png";
import videoIcon from "@/images/chat/video.png";
import infoIcon from "@/images/chat/info.png";
import attachIcon from "@/images/chat/img.png";
import cameraIcon from "@/images/chat/camera.png";
import micIcon from "@/images/chat/mic.png";
import emojiIcon from "@/images/chat/emoji.png";
import avatar from "@/images/chat/avatar.png";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]), // For previewing the image
      });
    }
  };

  const handleSend = async () => {
    if (text === "" && !img.file) return; // Ensure there's text or an image before sending

    let imgUrl = null;

    try {
      // If an image is selected, upload it and get the URL
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      // Create the message object including the image if available
      const newMessage = {
        senderId: currentUser.id,
        text, // The text message (can be empty if only an image is sent)
        createdAt: new Date(),
        ...(imgUrl && { img: imgUrl }), // Conditionally add the img property if image is uploaded
      };

      // Update the "chats" collection in Firestore by appending the new message
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion(newMessage),
      });

      // Update the user's chat metadata (e.g., last message, seen status, etc.)
      const userIDs = [currentUser.id, user.id];
      for (const id of userIDs) {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text || "Image";
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      // Reset the input and image states after sending the message
      setImg({
        file: null,
        url: "",
      });
      setText("");
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.top}>
        <div className={styles.user}>
          <Image src={user?.avatar || avatar} alt="User Avatar" width={60} height={60} />
          <div className={styles.texts}>
            <h4>{user?.username}</h4>
            {/* <p>Lorem ipsum dolor, sit amet.</p> */}
          </div>
        </div>
        <div className={styles.icons}>
          <Image src={phoneIcon} alt="Phone call" width={20} height={20} />
          <Image src={videoIcon} alt="Video call" width={20} height={20} />
          <Image src={infoIcon} alt="Info" width={20} height={20} />
        </div>
      </div>
      <div className={styles.center}>
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === currentUser?.id
                ? `${styles.message} ${styles.own}`
                : styles.message
            }
            key={message?.createAt}
          >
            <div className={styles.texts}>
              {message.img && (
                <Image src={message.img} alt="Message Image" width={200} height={200} />
              )}
              <p>{message.text}</p>
              <span>{format(message.createdAt.toDate())}</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className={`${styles.message} ${styles.own}`}>
            <div className={styles.texts}>
              <Image src={img.url} alt="Attached Image" width={200} height={200} />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.icons}>
          <label htmlFor="file">
            <Image src={attachIcon} alt="Attach" width={20} height={20} />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <Image src={cameraIcon} alt="Camera" width={20} height={20} />
          <Image src={micIcon} alt="Microphone" width={20} height={20} />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className={styles.emoji}>
          <Image
            src={emojiIcon}
            alt="Emoji"
            width={20}
            height={20}
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className={styles.picker}>
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
