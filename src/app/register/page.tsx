
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const VendorRegistrationInfo = () => {
    return (
        <div className="min-h-screen light-bg-css text-white px-6 py-16 flex flex-col items-center justify-center">
            <div className="max-w-2xl text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-6">
                    Become a Vendor
                </h1>
                <p className="text-lg mb-4">
                    Interested in selling your products on our platform? Follow the steps
                    below to get started:
                </p>

                <ol className="text-left text-white mb-8 space-y-3 list-decimal list-inside">
                    <li>
                        <strong>Register:</strong> Click the button below to access the admin
                        registration panel.
                    </li>
                    <li>
                        <strong>Approval:</strong> After registering, our team will review and
                        approve your application.
                    </li>
                    <li>
                        <strong>Go Live:</strong> Once approved, you can start uploading
                        products and managing your store.
                    </li>
                </ol>

                <Link
                    href={process.env.NEXT_PUBLIC_REGISTER_URL || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
                >
                    Register as a Vendor <ArrowRight className="ml-2" />
                </Link>

                <p className="text-sm mt-6 text-gray-400">
                    Already registered? Wait for an approval email from our team.
                </p>
            </div>
        </div>
    );
};

export default VendorRegistrationInfo;
