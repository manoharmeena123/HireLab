import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const SwitchPlanSection = dynamic(() => import("@/markup/Element/SwitchPlan"), {
  ssr: false,
  loading: () => <Loading />,
});

const SwitchPlanPage = () => {
  return <SwitchPlanSection />;
};

export default SwitchPlanPage;
