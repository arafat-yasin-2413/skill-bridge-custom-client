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



import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";

import {
    Control,
    Controller,
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormWatch,
} from "react-hook-form";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

type RegisterFormValues = {
    role: "STUDENT" | "TUTOR";
    name: string;
    email: string;
    password: string;
};

type RegisterFormProps = {
    register: UseFormRegister<RegisterFormValues>;
    handleSubmit: UseFormHandleSubmit<RegisterFormValues>;
    onSubmit: SubmitHandler<RegisterFormValues>;
    errors: FieldErrors<RegisterFormValues>;
    watch: UseFormWatch<RegisterFormValues>;
    isSubmitting: boolean;
    control: Control<RegisterFormValues>;
    handleGoogleRegister: ()=>void;
    selectedRole?: string;
    className?: string;
};

export function RegisterForm({
    className,
    register,
    handleSubmit,
    onSubmit,
    errors,
    watch,
    handleGoogleRegister,
    selectedRole,
    isSubmitting,
    control,
}: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Create your account
                    </CardTitle>

                    <CardDescription>
                        Enter your information below
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <FieldGroup>
                            {/* ROLE */}
                            <Field>
                                <FieldLabel>Role</FieldLabel>

                                <Controller
                                    name="role"
                                    control={control}
                                    rules={{
                                        required: "Role is required",
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="STUDENT">
                                                        STUDENT
                                                    </SelectItem>

                                                    <SelectItem value="TUTOR">
                                                        TUTOR
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors.role && (
                                    <FieldDescription className="text-red-500">
                                        {errors.role.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* GOOGLE */}
                            <Field>
                                <Button variant="outline" type="button"
                                onClick={handleGoogleRegister}
                                disabled={!selectedRole}>
                                    <FcGoogle />
                                    Register with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            {/* NAME */}
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Full Name
                                </FieldLabel>

                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />

                                {errors.name && (
                                    <FieldDescription className="text-red-500">
                                        {errors.name.message}
                                    </FieldDescription>
                                )}
                            </Field>

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
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>

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

                            {/* BUTTON */}
                            <Field>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting
                                        ? "Creating..."
                                        : "Create Account"}
                                </Button>

                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link href="/login">Log in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
