import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import axiosClient from "@/lib/axios-client";
import { AlertCircle, Loader } from "lucide-react";
import { useRef, useState } from "react";
import { AxiosResponse } from "axios";
import LoadingButton from "@/components/ui/loading-button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-provider";
import { CurrentUser } from "@/types/auth";

interface signupError {
    [Key: string]: Array<string>;
}

export default function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordconfirmationRef = useRef<HTMLInputElement>(null);
    const [errors, setErros] = useState<signupError>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { setToken, setUser } = useContext(AuthContext);

    const handelSubmit = (e: React.SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();

        const payload = {
            first_name: firstnameRef.current?.value,
            last_name: lastnameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordconfirmationRef.current?.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                const {user, token} = data;
                setErros({});
                setToken(token);
                setUser(user as CurrentUser);
            })
            .catch((err) => {
                const res = err.response as AxiosResponse;
                if (res && res.status == 422) {
                    setErros(res.data.errors);
                    console.log(res.data.errors);
                }
            })
            .finally(function () {
                setLoading(false);
            });
    };

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
                <form
                    className="flex flex-col space-y-4"
                    onSubmit={handelSubmit}
                >
                    <div className="flex flex-col gap-2">
                        {Object.keys(errors).map((Key) =>
                            errors[Key].map((err, i) => (
                                <Alert
                                    key={`${Key} ${i}`}
                                    variant={"destructive"}
                                    className="flex flex-row items-start"
                                >
                                    <div className="mr-3 inline-block">
                                        <AlertCircle className="h5 w-5" />
                                    </div>
                                    <AlertDescription>{err}</AlertDescription>
                                </Alert>
                            ))
                        )}
                    </div>
                    <div className="flex flex-col space-y-3 p-3">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="w-96"
                            ref={emailRef}
                        />
                        <div className="flex gap-1">
                            <Input
                                type="text"
                                placeholder="First Name"
                                className="w-48"
                                ref={firstnameRef}
                            />
                            <Input
                                type="text"
                                placeholder="Last Name"
                                className="w-48"
                                ref={lastnameRef}
                            />
                        </div>

                        <Input
                            type="password"
                            placeholder="Password"
                            className="w-96"
                            ref={passwordRef}
                        />
                        <Input
                            type="password"
                            placeholder="Confirm Your Password"
                            className="w-96"
                            ref={passwordconfirmationRef}
                        />
                    </div>

                    <LoadingButton isLoading={loading}>Sign Up</LoadingButton>
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
