'use client';

import { usePathname } from "next/navigation";  
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import BackButton from "./BackButton";

export default function ConditionLayout({ children}) {
    const pathname = usePathname();

    //List of paths where Navbar and Footer should be excluded
    const excludedPaths = [
        "/admin",
    ];

    //Check if the current route matches any of the excluded paths
    const excludeNavAndFoot = excludedPaths.some((excludedPath) =>
    pathname.startsWith(excludedPath)
);

return (
    <>
    {!excludeNavAndFoot && <Navbar/>}
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
                style: {
                  position: "center",
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
                style: {
                  position: "center",
                  background: "#FFA000",
                  color: "#fff",
                },
              },
            }}
          />

    <div className= {excludeNavAndFoot ? "" : "pt-16"}>
        {children}
    </div>
    <BackButton />
    {!excludeNavAndFoot && <Footer /> }

    </>
);
}