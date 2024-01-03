"use client";

import { Spinner } from "flowbite-react";

export default function Loading({
    size = "md",
    className,
}: {
    size?: "sm" | "md" | "lg";
} & React.ComponentProps<"div">) {
    return (
        <div
            className={` w-fit mx-auto flex gap-5 bg-background-normal rounded-2xl ${className}`}
        >
            <Spinner size={size} />
            <p
                className={` text-secondary-900 font-semibold ${
                    size == "md"
                        ? "text-base"
                        : size == "sm"
                        ? "text-sm"
                        : "text-lg"
                }`}
            >
                Loading...
            </p>
        </div>
    );
}
