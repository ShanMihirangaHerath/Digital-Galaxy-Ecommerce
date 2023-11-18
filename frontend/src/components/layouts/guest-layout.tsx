import { Outlet } from "react-router-dom";

import ModeToggle from "@/components//mode-toggle";

import signin from "@/assets/videos/signin.mp4";

export default function GuestLayout() {
    return (
        <div className="container grid h-screen max-w-none items-center justify-center p-0 md:grid-cols-2">
            <div className="hidden md:block h-full w-full">
                <video
                    src={signin}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                ></video>
            </div>
            <div className="px-8">
                <div className="left left-5/8 absolute top-4 md:top-8">
                    <ModeToggle/>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
