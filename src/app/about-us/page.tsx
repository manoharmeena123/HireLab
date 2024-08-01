import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const AboutSection = dynamic(() => import("@/markup/Element/About"), {
  ssr: false,
  loading: () => <Loading />,
});

const AboutPage = () => {
  return <AboutSection />;
};

export default AboutPage;
