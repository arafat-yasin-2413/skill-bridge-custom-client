"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GoogleSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            try {
                const role = searchParams.get("role");

                console.log("ROLE:", role);

                // Better Auth session
                const session = await authClient.getSession();

                console.log("SESSION:", session);

                const user = session.data?.user;

                if (!user) {
                    toast.error("No Google user found");
                    return;
                }

                // send to backend
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            sub: user.id,
                            role,
                        }),
                    },
                );

                const result = await response.json();
                if (result.token) {
                    localStorage.setItem("token", result.token);
                }

                console.log("BACKEND RESULT:", result);

                if (!response.ok) {
                    toast.error(result.message);
                    return;
                }

                // SAVE YOUR JWT
                localStorage.setItem("token", result.token);

                // optional user save
                localStorage.setItem("user", JSON.stringify(result.user));

                toast.success("Google login successful");

                router.push("/");
            } catch (error) {
                console.error(error);
                toast.error("Google login failed");
            }
        };

        handleGoogleAuth();
    }, [router, searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            Completing Google login...
        </div>
    );
}
