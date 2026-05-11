"use client";

import { RegisterForm } from "@/components/register-form";
import LogoBrand from "@/components/shared/LogoBrand";
import Link from "next/link";

import { useForm } from "react-hook-form";

type registerFormValues = {
    name: string;
    email: string;
    password: string;
};

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<registerFormValues>();

    const onSubmit = async (data: registerFormValues) => {
        console.log(data);

        // api call here
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
                    onSubmit={onSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}