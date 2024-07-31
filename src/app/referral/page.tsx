
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const ReferralSection = dynamic(
  () => import("@/markup/Element/ReferralSection"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const ReferralSectionPage = () => {
  return <ReferralSection />;
};

export default ReferralSectionPage;
