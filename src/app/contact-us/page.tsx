import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const ContactUsSectionSection = dynamic(
() => import("@/markup/Element/ContactUsSection"),
{
ssr: false,
loading: () => <Loading />,
}
);

const ContactUsSectionPage = () => {
return <ContactUsSectionSection />;
};

export default ContactUsSectionPage;