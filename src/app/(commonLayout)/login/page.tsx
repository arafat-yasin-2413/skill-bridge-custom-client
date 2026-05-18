"use client";

import { LoginForm } from "@/components/forms/login-form";
import LogoBrand from "@/components/shared/layout/LogoBrand";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/providers/AuthProvider";
import { getUser } from "@/services/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type loginFormValues = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<loginFormValues>();

    const router = useRouter();
    const searchParams = useSearchParams();
    const { loadUser } = useAuth();

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleGoogleLogin = async()=>{
        await authClient.signIn.social({
            provider: "google",
            callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/google-success`,
        });
    };

    // const onSubmit = async (data: loginFormValues) => {
        console.log(data);

        const toastId = toast.loading("Logging In....");
        try {
        //     // api call here
        //     const response = await fetch(
        //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             credentials: "include",
        //             body: JSON.stringify(data),
        //         },
        //     );

        //     const result = await response.json();
        //     // console.log("Login response printing ---- : ", response);
        //     // console.log("Login result printing ---- : ", result);

        //     if (!response.ok) {
        //         // throw new Error(result.message || "Login Failed!!!");
        //         toast.error(result.message || "Login failed.", {
        //             id: toastId,
        //         });

        //         return;
        //     }

        //     toast.success(result.message, {
        //         id: toastId,
        //     });

        //     // console.log("Token ====== : ", result.data.token);
        //     console.log("Success. ", result);
            
        //     // auth state update
        //     await loadUser();

        //     reset();
        //     router.push(callbackUrl);
        //     router.refresh();
        // } catch (error) {
        //     toast.error(
        //         error instanceof Error
        //             ? error.message
        //             : "Something went wrong!",
        //         {
        //             id: toastId,
        //         },
        //     );

        //     console.error("Error : ", error);
        // }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/">
                    <LogoBrand />
                </Link>
                <LoginForm
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    handleGoogleLogin={handleGoogleLogin}
                />
            </div>
        </div>
    );
}
