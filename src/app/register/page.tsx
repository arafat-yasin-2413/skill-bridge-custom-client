import LogoBrand from "@/components/shared/LogoBrand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LoginProps {
    heading?: string;
    buttonText?: string;
    googleText?: string;
    loginText?: string;
    loginUrl?: string;
    className?: string;
}

export default function Login({
    heading = "Register",

    buttonText = "Login",
    loginText = "Already have an account?",
    loginUrl = "/login",
    className,
}: LoginProps) {
    return (
        <section className={cn("h-screen bg-muted", className)}>
            <div className="flex h-full items-center justify-center">
                {/* Logo */}
                <div className="flex flex-col items-center gap-6 lg:justify-start">
                    <LogoBrand />
                    <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
                        {heading && (
                            <h1 className="text-xl font-semibold">{heading}</h1>
                        )}
                        <Input
                            type="email"
                            placeholder="Email"
                            className="text-sm"
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="text-sm"
                            required
                        />
                        <Button type="submit" className="w-full">
                            {buttonText}
                        </Button>
                    </div>
                    <div className="flex justify-center gap-1 text-sm text-muted-foreground">
                        <p>{loginText}</p>
                        <a
                            href={loginUrl}
                            className="font-medium text-primary hover:underline">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
