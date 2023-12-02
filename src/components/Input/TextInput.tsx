"use client";

import {
    CustomFlowbiteTheme,
    Label,
    TextInput as _TextInput,
} from "flowbite-react";
import React, { ForwardedRef } from "react";
import { HTMLInputTypeAttribute } from "react";

export default React.forwardRef(function TextInput(
    {
        title,
        icon,
        rightIcon,
        type = "text",
        placeholder = "",
        className = "",
        error = false,
        sizing = "md",
        onRightIconClick,
        ...props
    }: PropTypes,
    ref: ForwardedRef<HTMLInputElement>,
) {
    return (
        <div className={className}>
            <div className="mb-2 block">
                <Label htmlFor={title} value={title} />
            </div>
            <_TextInput
                theme={theme}
                ref={ref}
                id={title}
                type={type}
                icon={icon}
                rightIcon={rightIcon}
                placeholder={placeholder}
                sizing={sizing}
                {...props}
                color={error ? "failure" : undefined}
                required
            />
        </div>
    );
});

const theme: CustomFlowbiteTheme["textInput"] = {
    field: {
        input: {
            base: "!bg-secondary-25 !border-secondary-200 focus:!border-primary-400 focus:!ring-0",
            sizes: {
                sm: "!py-2 !px-4",
                md: "!py-3 !px-4",
                lg: "!py-3 !px-4",
            },
            withIcon: {
                off: "",
                on: "!pl-10",
            },
            withRightIcon: {
                off: "",
                on: "!pr-10",
            },
        },
    },
};

type PropTypes = {
    title: string;
    type?: HTMLInputTypeAttribute;
    icon?: any;
    rightIcon?: any;
    placeholder?: string;
    error?: boolean;
    onRightIconClick?: () => void;
    sizing?: "sm" | "md" | "lg";
} & React.ComponentPropsWithRef<"input">;

