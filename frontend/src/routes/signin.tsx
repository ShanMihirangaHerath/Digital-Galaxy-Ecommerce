import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import axiosClient from "@/lib/axios-client";
import { AlertCircle } from "lucide-react";
import { useRef, useState } from "react";
import { AxiosResponse } from "axios";
import LoadingButton from "@/components/ui/loading-button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-provider";
import { CurrentUser } from "@/types/auth";
import { AuthError } from "@/types/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErros] = useState<AuthError | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const { setToken, setUser } = useContext(AuthContext);
    const [rememberMe, setRememberMe] = useState(false);

    const handelSubmit = (e: React.SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();

        const payload = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            remember: rememberMe,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                const { user, token } = data;
                setErros(null);
                setToken(token);
                setUser(user as CurrentUser);
            })
            .catch((err) => {
                const res = err.response as AxiosResponse;
                if (res && res.status == 422) {
                    setErros(res.data);
                    console.log(res.data);
                }
            })
            .finally(function () {
                setLoading(false);
            });
    };

    return (
        <>
            <Link
                to="/Signup"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Sign Up
            </Link>
            <div className="flex w-full flex-col items-center justify-center space-y-8">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Sign In To Digital-Galaxy
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter Your Email Below To Sign In
                    </p>
                </div>
                <form
                    className="flex flex-col space-y-4"
                    onSubmit={handelSubmit}
                >
                    <div className="flex flex-col gap-2">
                        {errors &&
                            errors.errors &&
                            Object.keys(errors.errors).map(
                                (key) =>
                                    errors.errors?.[key].map((err, i) => (
                                        <Alert
                                            key={`${key} ${i}`}
                                            variant="destructive"
                                            className="flex flex-row items-start"
                                        >
                                            <div className="mr-3 inline-block">
                                                <AlertCircle className="h-5 w-5" />
                                            </div>
                                            <AlertDescription>
                                                {err}
                                            </AlertDescription>
                                        </Alert>
                                    ))
                            )}
                        {errors && !errors.errors && errors.message && (
                            <Alert
                                variant="destructive"
                                className="flex flex-row items-start"
                            >
                                <div className="mr-3 inline-block">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <AlertDescription>
                                    {errors?.errors}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 p-3">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="w-96"
                            ref={emailRef}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="w-96"
                            ref={passwordRef}
                        />
                        <div className="mt-3 flex flex-row items-center justify-between gap-1">
                            <div className="text-xs">Forgot Password?</div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms2"
                                    checked={rememberMe}
                                    onClick={() => setRememberMe(!rememberMe)}
                                />
                                <Label htmlFor="terms2">
                                    Remember me {rememberMe}
                                </Label>
                            </div>
                        </div>
                    </div>

                    <LoadingButton isLoading={loading}>Sign In</LoadingButton>
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
