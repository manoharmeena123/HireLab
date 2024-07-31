
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const GrievancesSection = dynamic(
  () => import("@/markup/Element/Grievances"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const GrievancesPage = () => {
  return <GrievancesSection />;
};

export default GrievancesPage;
