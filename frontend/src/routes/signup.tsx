import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <>
            <Link
                to="/login"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Login
            </Link>
            <div className="flex w-full flex-col items-center justify-center space-y-8">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create An Account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter Your Email Below To Create Your Account
                    </p>
                </div>
                <form className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-3 p-3">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="w-96"
                        />
                        <div className="flex gap-1">
                            <Input
                                type="text"
                                placeholder="First Name"
                                className="w-48"
                            />
                            <Input
                                type="text"
                                placeholder="Last Name"
                                className="w-48"
                            />
                        </div>

                        <Input
                            type="password"
                            placeholder="Password"
                            className="w-96"
                        />
                        <Input
                            type="password"
                            placeholder="Confirm Your Password"
                            className="w-96"
                        />
                    </div>
                    <Button>Sign UP</Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By Clicking Continue, you agree to our &nbsp;
                    <Link
                        to="/team"
                        className="Underline-offset-4 underline hover:text-primary"
                    >
                        Teams of Service
                    </Link>
                    &nbsp; and &nbsp;
                    <Link
                        to="/privacy"
                        className="Underline-offset-4 underline hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </>
    );
}
