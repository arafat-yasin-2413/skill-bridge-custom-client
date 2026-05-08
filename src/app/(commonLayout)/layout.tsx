import { Navbar } from "@/components/shared/Navbar";
import React from "react";

function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default CommonLayout;
