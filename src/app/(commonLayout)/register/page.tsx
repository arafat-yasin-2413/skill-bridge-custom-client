"use client";

import { RegisterForm } from "@/components/register-form";
import LogoBrand from "@/components/shared/LogoBrand";
import Link from "next/link";

import { useForm } from "react-hook-form";

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
        formState: { errors, isSubmitting },
    } = useForm<registerFormValues>();

    const onSubmit = async (data: registerFormValues) => {
        console.log(data);
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
                throw new Error(result.message || "Registration Failed!!!");
            }

            console.log("Success. ", result);
        } catch (error) {
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
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
