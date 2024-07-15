// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const LoginSection = dynamic(
  () => import("@/markup/Element/LoginSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const LoginSectionPage = () => {
  return <LoginSection />;
};

export default LoginSectionPage;
