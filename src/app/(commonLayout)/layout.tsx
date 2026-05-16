import { Navbar } from "@/components/shared/layout/Navbar";
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
