import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const Profile = dynamic(() => import("@/markup/Element/Profile"), {
  ssr: false,
  loading: () => <Loading />,
});

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;
