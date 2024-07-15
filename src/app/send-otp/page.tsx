// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const SendOtpSection = dynamic(
  () => import("@/markup/Element/OtpVefication"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const SendOtpSectionPage = () => {
  return <SendOtpSection />;
};

export default SendOtpSectionPage;
