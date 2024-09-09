"use client";
import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { auth, db } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import styles from "./ChatSection.module.css";
import { useLoggedInUser } from "@/hooks"; // Custom hook for fetching logged-in user
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const ChatSection = () => {
  const { user } = useLoggedInUser(); // Fetch logged-in user details
  const { currentUser, isLoading, fetchUserInfo } = useUserStore(); // Zustand store for user
  console.log('currentUser', currentUser)
  const { chatId } = useChatStore(); // Zustand store for chat
  const [loading, setLoading] = useState(false);

  // Function to fetch user data from Firestore using user?.user?.id
  const fetchUserDataFromFirestore = async (userId :any) => {
    setLoading(true);
    try {
      const userQuery = query(
        collection(db, "users"),
        where("id", "==", userId)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // Assuming you're fetching only one document for this user
        const userDoc = querySnapshot.docs[0].data();
        fetchUserInfo(userDoc?.id); // Store user info in Zustand
        console.log('Fetched user data:', userDoc);
      } else {
        console.log("User not found in Firestore");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user?.user?.id) {
      console.log("User ID:", user?.user?.id);
      fetchUserDataFromFirestore(user?.user?.id); // Fetch user data based on ID
    }
  }, [user]);

  // // Effect to monitor Firebase auth state
  // useEffect(() => {
  //   // const unSub = auth.onAuthStateChanged((user :any) => {
  //     if (user) {
  //       console.log('userss', user)
  //       fetchUserInfo(user?.user?.id); // Correct, uses the Firebase auth user ID
  //     }

  //   // return () => {
  //   //   unSub();
  //   // };
  // }, [user]);


  // if (isLoading || loading)
  //   return <div className={styles.loading}>Loading...</div>; // Apply loading style

  return (
    <div className={styles.container}>
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default ChatSection;
