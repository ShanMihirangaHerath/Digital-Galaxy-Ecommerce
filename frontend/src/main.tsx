import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

import { router } from "@/routes";

import { AuthProvider } from "./context/auth-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);
