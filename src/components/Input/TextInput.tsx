"use client";

import {
    CustomFlowbiteTheme,
    Label,
    TextInputProps,
    TextInput as _TextInput,
} from "flowbite-react";
import React, { ForwardedRef, HTMLInputTypeAttribute, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

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
        addon,
        rightAddon,
        addonClassName,
        onRightAddonClick,
        rightAddonClassName,
        readOnly,
        value,
        ...props
    }: PropTypes,
    ref: ForwardedRef<HTMLInputElement>,
) {
    const theme = {
        rightAddon: twMerge(
            "bg-primary-100 px-4 flex items-center rounded-tr-lg rounded-br-lg border border-secondary-200 border-l-0",
            rightAddonClassName,
        ),
        input: {
            withRightAddon: "!rounded-r-none",
            status: {
                error: "!border-red-500 !text-red-600 focus:!border-red-600",
            },
        },
    };

    const customTheme: CustomFlowbiteTheme["textInput"] = {
        addon: twMerge(
            "bg-primary-100 px-4 flex items-center rounded-tl-lg rounded-bl-lg border border-secondary-200 border-r-0",
            addonClassName,
        ),
        field: {
            input: {
                base: twMerge(
                    "!bg-secondary-25 !border-secondary-200 placeholder-secondary-500 text-secondary-900 focus:!border-primary-400 focus:!ring-0 !w-full",
                    rightAddon && theme.input.withRightAddon,
                    error && theme.input.status.error,
                ),
                sizes: {
                    sm: "!py-2 !px-4 text-sm",
                    md: "!py-3 !px-4 text-sm",
                    lg: "!py-3 !px-4",
                },
                colors: { gray: " text-secondary-900" },
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

    return (
        <div className={className}>
            {readOnly ? (
                <div className=" flex flex-col gap-[2px]">
                    <p className=" text-sm text-secondary-600 flex gap-1 items-center">
                        {title}
                    </p>
                    <p className=" text-base font-medium flex gap-1 items-center">
                        {value}
                    </p>    
                </div>
            ) : (
                <>
                    {title && (
                        <div className="mb-2 block">
                            <Label
                                htmlFor={title}
                                className="font-semibold text-secondary-900 "
                                value={title}
                            />
                        </div>
                    )}
                    <div className=" relative flex w-full">
                        <_TextInput
                            theme={customTheme}
                            className="w-full"
                            ref={ref}
                            id={title}
                            type={type}
                            icon={icon}
                            placeholder={placeholder}
                            sizing={sizing}
                            addon={addon}
                            value={value}
                            {...props}
                            required
                            autoComplete="off"
                        />
                        <div
                            onClick={onRightIconClick}
                            className=" absolute p-1 top-1/2 -translate-y-1/2 right-3 rounded-full hover:bg-background-hover active:bg-background-active duration-150 cursor-pointer"
                        >
                            {rightIcon}
                        </div>
                        {rightAddon && (
                            <span
                                onClick={onRightAddonClick}
                                className={`${theme.rightAddon} cursor-pointer hover:bg-primary-200 active:bg-primary-300`}
                            >
                                {rightAddon}
                            </span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
});

type PropTypes = Omit<
    React.ComponentPropsWithRef<"input"> & TextInputProps,
    "rightIcon"
> & {
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    error?: boolean;
    onRightIconClick?: () => void;
    onRightAddonClick?: () => void;
    rightAddon?: ReactNode;
    addonClassName?: string;
    rightAddonClassName?: string;
    rightIcon?: ReactNode;
};
