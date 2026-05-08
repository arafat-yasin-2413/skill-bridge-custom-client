import LogoBrand from "@/components/shared/LogoBrand";
import { SignupForm } from "@/components/signup-form";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/">
                    <LogoBrand />
                </Link>
                <SignupForm />
            </div>
        </div>
    );
}
