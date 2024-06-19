import Footer from "@/app/layout/Footer";
import Header from "@/app/layout/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import AuthProvider from "@/provider/AuthProvider";

export default async function HireLabLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession(authOptions);
    
     return (
         <div>
            {/* <AuthProvider> */}
           <Header session={session} />
            {children}
          <Footer />
          {/* </AuthProvider> */}
         </div>
     )
}
   
   