import React, { useState } from "react";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";
import styles from "./AddUser.module.css"; // Import the CSS module
import avatar from '@/images/chat/avatar.png';

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      console.log('newChatRef', newChatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.addUser}>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" className={styles.input} />
        <button className={styles.button}>Search</button>
      </form>
      {user && (
        <div className={styles.user}>
          <div className={styles.detail}>
            <img src={user.avatar || avatar} alt="" className={styles.img} />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd} className={styles.button}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
