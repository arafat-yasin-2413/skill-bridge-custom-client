"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type loginFormValues = {
    email: string;
    password: string;
};

type loginFormProps = {
    register: UseFormRegister<loginFormValues>;
    handleSubmit: UseFormHandleSubmit<loginFormValues>;
    onSubmit: SubmitHandler<loginFormValues>;
    errors: FieldErrors<loginFormValues>;
    isSubmitting: boolean;
    className?: string;
    handleGoogleLogin: ()=>void;
};

export function LoginForm({
    className,
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleGoogleLogin,
    isSubmitting,
    ...props
}: loginFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            
                            <Field>
                                <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                                    <FcGoogle />
                                    Login with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            {/* EMAIL */}
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <FieldDescription className="text-red-500">
                                        {errors.email.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* PASSWORD */}
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto text-sm underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className="pr-10"
                                        {...register("password", {
                                            required: "Password is required",

                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password must be at least 8 characters",
                                            },
                                        })}
                                    />

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-1 h-7 w-7 active:translate-y-0 active:scale-95 hover:bg-transparent">
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                                {errors.password ? (
                                    <FieldDescription className="text-red-500">
                                        {errors.password.message}
                                    </FieldDescription>
                                ) : (
                                    <FieldDescription>
                                        Must be at least 8 characters long.
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Logging in" : "Log in"}
                                </Button>

                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register">Register</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <Link href="/terms-policy">Terms of Service</Link> and{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
            </FieldDescription>
        </div>
    );
}
