"use client";

import { LoginForm } from "@/components/login-form";
import LogoBrand from "@/components/shared/LogoBrand";
import Link from "next/link";
import { useForm } from "react-hook-form";

type loginFormValues = {
    email: string;
    password: string;
}

export default function LoginPage() {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<loginFormValues>()

    const onSubmit = (data: loginFormValues)=>{
        console.log(data);
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/">
                    <LogoBrand/>
                </Link>
                <LoginForm
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
