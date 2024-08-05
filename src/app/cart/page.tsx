// app/single-discussion/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const CartSection = dynamic(
  () => import("@/markup/Element/CartSection"),
  {
    ssr: false,
    loading: () => <CartSection />,
  }
);

const CartSectionPage = () => {
  return <CartSection />;
};

export default CartSectionPage;
