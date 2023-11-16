import { Outlet } from "react-router-dom";

export default function GuestLayout(){
    return(
        <div className="container grid justify-center h-screen items-center md:grid-cols-2">
            <div className="hidden md:block">Left Panel</div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}