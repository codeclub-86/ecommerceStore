"use client";

import { Toaster } from "react-hot-toast";

export default function ClientToaster() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: "#222",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "14px",
                },
            }}
        />
    );
}
