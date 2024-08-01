// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const RegisterSectionSection = dynamic(() => import("@/markup/Element/Register"), {
  ssr: false,
  loading: () => <Loading />,
});

const RegisterSectionPage = () => {
  return <RegisterSectionSection />;
};

export default RegisterSectionPage;
