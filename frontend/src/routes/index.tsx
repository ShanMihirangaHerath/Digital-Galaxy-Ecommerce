// This is the recommended router for all React Router web projects.
import GuestLayout from "@/components/layouts/guest-layout";
import { createBrowserRouter } from "react-router-dom";

import Signup from "./signup";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout/>,
        children: [{path: "/signup", element: <Signup/>}],
    },
]);