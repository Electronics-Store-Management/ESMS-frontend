"use client";

import React from "react";
import MenuButton from "../SideBar/MenuButton";
import useScreen from "@/hooks/useScreen";

export default function MobileHeader({
    title,
}: React.ComponentProps<"div"> & {
    title?: string;
}) {
    const screen = useScreen();
    const isMobile = !screen("md");

    return isMobile ? (
        <div className=" w-full flex justify-between items-center mb-6">
            <p className=" font-bold text-3xl text-secondary-900">{title}</p>
            <MenuButton />
        </div>
    ) : null;
}
