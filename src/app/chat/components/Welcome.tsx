"use client";
import React from "react";
import GoogleSignin from "@/images/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

  return (
    <main
      style={{
        padding: "30px",
        textAlign: "center",
        marginTop: "40px",
        color: "#7cc5d9",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Welcome to React Chat.</h2>
    
      <p style={{ marginBottom: "20px" }}>
        Sign in with Google to chat with your fellow React Developers.
      </p>
      <button
        onClick={googleSignIn}
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        type="button"
      >
        <img src={GoogleSignin as any} alt="sign in with google" />
      </button>
    </main>
  );
};

export default Welcome;
