"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import {
    ButtonProps,
    ButtonSizes,
    CustomFlowbiteTheme,
    Spinner,
    Button as _Button,
} from "flowbite-react";

import React from "react";

export default function Button({
    fill = true,
    size = "md",
    btnType = "primary",
    children = "Untitle",
    hiddenTitle,
    className,
    ref,
    isLoading = false,
    ...props
}: PropTypes) {
    return (
        <_Button
            theme={getTheme(fill)}
            color={btnType}
            className={`${className} group transition-all duration-300`}
            size={size}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Spinner size={size} />
            ) : (
                <div className=" flex items-center">
                    {children}
                    {hiddenTitle && (
                        <p className=" font-semibola overflow-hidden w-fit max-w-0 group-hover:max-w-[70px] group-hover:ml-2 transition-all duration-300">
                            {hiddenTitle}
                        </p>
                    )}
                </div>
            )}
        </_Button>
    );
}

const getTheme = (isFill: boolean): CustomFlowbiteTheme["button"] => {
    if (isFill)
        return {
            base: " flex flex-row items-stretch items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none",
            color: {
                primary:
                    "bg-primary-300 hover:bg-primary-400 focus:ring-primary-100 text-white",
                secondary:
                    "bg-background-normal hover:bg-secondary-50 focus:ring-secondary-100 text-secondary-900",
                error: "bg-color-error hover:bg-red-600 focus:ring-red-100 text-white",
            },
        };
    return {
        color: {
            base: " flex flex-row items-stretch items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none",
            primary:
                "bg-transparent hover:bg-primary-50 focus:ring-primary-100 text-primary-600",
            secondary:
                "bg-transparent hover:bg-secondary-50 focus:ring-secondary-100 text-secondary-900",
            error: "bg-transparent hover:bg-red-50 focus:ring-error-100 text-color-error",
        },
    };
};

type PropTypes = ReactNodeChildren &
    ButtonProps &
    React.ComponentPropsWithRef<"button"> & {
        fill?: boolean;
        size?: keyof ButtonSizes;
        btnType?: "primary" | "secondary" | "error";
        isLoading?: boolean;
        hiddenTitle?: string;
    };
