"use client";
import React from "react";
import GoogleSignin from "@/images/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Google Sign-In Error:", error);
    });
  };

  const signOut = () => {
    auth.signOut().catch((error) => {
      console.error("Sign Out Error:", error);
    });
  };

  return (
    <nav
      style={{
        padding: "10px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4c768d",
        color: "#242443",
        height: "60px",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <h1>React Chat</h1>
      {user ? (
        <button
          onClick={signOut}
          type="button"
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            color: "#88dded",
            border: "1px solid #1c2c4c",
            backgroundColor: "#1c2c4c",
            fontWeight: 600,
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={googleSignIn}
          type="button"
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <img
            src={GoogleSignin as any}
            alt="sign in with google"
            style={{
              height: "30px",
              width: "auto",
            }}
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
