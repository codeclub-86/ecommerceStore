"use client";

import { Toaster } from "sonner";

export default function ClientToaster() {
    return (
        <Toaster
            position="top-center"
            expand
            richColors
            closeButton
        />
    );
}
