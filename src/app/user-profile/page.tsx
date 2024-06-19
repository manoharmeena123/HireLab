// src/app/user-profile/page.tsx
"use client";
import React from "react";
import { ProfileDropdown } from "@/components/ProfileDropdown"; // Ensure this path is correct
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions"; // Ensure this path is correct

interface PageProps {
  sessionUser: CustomUser;
}

const UserProfilePage: React.FC<PageProps> = ({ sessionUser }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <ProfileDropdown sessionUser={sessionUser} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      sessionUser: session.user as CustomUser,
    },
  };
};

export default UserProfilePage;
