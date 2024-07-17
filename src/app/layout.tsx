import "../css/plugins.css";
import "../css/style.css";
import "../css/templete.css";
import "../css/skin/skin-1.css";
import "../plugins/slick/slick.min.css";
import "../plugins/slick/slick-theme.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProviderTree } from "@/provider";
import { Inter } from 'next/font/google';
import Header from "@/app/layouts/Header";
import Footer from "@/app/layouts/Footer";
import ClientWrapper from "@/services/ClientWrapper"; // Adjust the import path as necessary
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProviderTree>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <ToastContainer />
        </ProviderTree>
      </body>
    </html>
  );
}
