import '../css/plugins.css';
import '../css/style.css';
import '../css/templete.css';
import '../css/skin/skin-1.css';
import '../plugins/slick/slick.min.css';
import '../plugins/slick/slick-theme.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ProviderTree } from "@/provider";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Hirelab",
  description: "Job portal for job seeker",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body className={inter.className}>
        <ProviderTree>{children}</ProviderTree>
      </body>
    </html>
  );
}
