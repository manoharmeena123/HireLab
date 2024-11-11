import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const AccountSetting = dynamic(() => import("@/markup/Element/AccountSetting"), {
  ssr: false,
});

const AccountSettingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AccountSetting />
    </Suspense>
  );
};

export default AccountSettingPage;
