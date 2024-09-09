import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import styles from "./Login.module.css"; // Import the CSS module
import GoogleSignin from "@/images/chat/google.png"; // Replace with your correct path
import Image  from 'next/image'
import { useLoggedInUser } from "@/hooks/useLoggedInUser";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useLoggedInUser();
  console.log('user', user)
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Ensure user?.user?.id exists
      if (!user?.user?.id) {
        throw new Error("User ID not found");
      }
  
      // Fetch the user document based on the provided user ID
      const userDocQuery = query(collection(db, "users"), where("id", "==", user?.user?.id));
      const querySnapshot = await getDocs(userDocQuery);
  
      if (querySnapshot.empty) {
        // If the user doesn't exist in Firestore, create a new user
        await setDoc(doc(db, "users", user?.user?.id.toString()), {
          username: user?.user?.name,
          email: user?.user?.email,
          avatar: user?.user?.image,
          id: user?.user?.id,
          mobile_number: user?.user?.mobile_number,
          blocked: [],
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        });
  
        await setDoc(doc(db, "userchats", user?.user?.id.toString()), {
          chats: [],
        });
      } else {
        // Update the last login time if the user exists
        const docRef = doc(db, "users", user?.user?.id.toString());
        await setDoc(docRef, { lastLoginAt: new Date().toISOString() }, { merge: true });
      }
  
      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Error handling sign-in: ", error);
      toast.error("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles.login}>
      <div className={styles.item}>
        <h2>Sign In with Google</h2>
        <button onClick={handleGoogleSignIn} disabled={loading} className={styles.submitButton}>
          {/* <Image src={GoogleSignin} width={20} height={20}  objectFit={"contain"} alt="Google Logo" /> */}
          {loading ? "Loading..." : "Continue Chat with Firebase"}
        </button>
      </div>
    </div>
  );
};

export default Login;
