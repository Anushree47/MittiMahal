import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        <Toaster 
        position="center"
        reverseOrder={false}
        toastOptions=
        {{
          // Default toast styles
          style: {
            position: "center",
            background: "#333",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px",
          },
          // Success toast styles
          success: {
            style: {
              position: "center",
              background: "#4CAF50",
              color: "#fff",
            },
            iconTheme: {
              position: "center",
              primary: "#fff",
              secondary: "#4CAF50",
            },
          },
          // Error toast styles
          error: {
            style: {   position: "center",
              background: "#FF5252",
              color: "#fff",
            },
            iconTheme: {
              position: "center",
              primary: "#fff",
              secondary: "#FF5252",
            },
          },
          // Loading toast styles
          loading: {
            style: {   position: "center",
              background: "#FFA000",
              color: "#fff",
            },
          },
        }}
      />
    

                {children}
                <BackButton></BackButton>
                <Footer></Footer>
      </body>
    </html>
  );
}
