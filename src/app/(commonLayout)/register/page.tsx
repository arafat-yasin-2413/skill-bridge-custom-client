"use client";

import { RegisterForm } from "@/components/forms/register-form";
import LogoBrand from "@/components/shared/layout/LogoBrand";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import { useForm } from "react-hook-form";
import {toast} from "sonner";

type registerFormValues = {
    role: "STUDENT" | "TUTOR";
    name: string;
    email: string;
    password: string;
};

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<registerFormValues>();

    const selectedRole = watch("role");

    const handleGoogleRegister = async()=>{
        const role = watch("role");

        if(!role) {
            toast.error("Please select a role first.");
            return;
        }

        await authClient.signIn.social({
            provider: "google",
            callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/google-success?role=${role}`,
        });
    };

    const onSubmit = async (data: registerFormValues) => {
        console.log(data);
        const toastId = toast.loading("Creating Account....");
        try {
            // api call here
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            const result = await response.json();
            console.log("Register response printing ---- : ", response);
            console.log("Register result printing ---- : ", result);

            if (!response.ok) {
                // throw new Error(result.message || "Registration Failed!!!");
                toast.error(result.message || "Registration failed.", {
                    id: toastId,
                });

                return;

            }

            toast.success("Account created Successfully!", {
                id: toastId,
            });

            console.log("Success. ", result);
            reset();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong!", {
                id: toastId,
            });

            console.error("Error : ", error);
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium">
                    <LogoBrand />
                </Link>

                <RegisterForm
                    register={register}
                    handleSubmit={handleSubmit}
                    control={control}
                    onSubmit={onSubmit}
                    errors={errors}
                    watch={watch}
                    isSubmitting={isSubmitting}
                    handleGoogleRegister={handleGoogleRegister}
                    selectedRole={watch("role")}
                />
            </div>
        </div>
    );
}
