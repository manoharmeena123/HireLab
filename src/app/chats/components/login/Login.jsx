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

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
   console.log('result', result)
   console.log('user', user)

      // Check if the user already exists in Firestore
      const userDoc = await getDocs(query(collection(db, "users"), where("email", "==", user.email)));

      console.log('userDoc', userDoc)
      if (userDoc.empty) {
        // If the user doesn't exist, create a new user record
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          id: user.uid,
          blocked: [],  // Initialize an empty blocked list
          createdAt: new Date().toISOString(), // Record the account creation time
          lastLoginAt: new Date().toISOString(), // Record the last login time
        });

        await setDoc(doc(db, "userchats", user.uid), {
          chats: [], // Initialize an empty chats array
        });
      } else {
        // If the user exists, update the last login time
        await setDoc(doc(db, "users", user.uid), {
          lastLoginAt: new Date().toISOString(),
        }, { merge: true });
      }

      toast.success("Successfully signed in with Google!");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.item}>
        <h2>Sign In with Google</h2>
        <button onClick={handleGoogleSignIn} disabled={loading} className={styles.submitButton}>
          <Image src={GoogleSignin} width={20} height={20}  objectFit={"contain"} alt="Google Logo" />
          {loading ? "Loading..." : "Sign In with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;
