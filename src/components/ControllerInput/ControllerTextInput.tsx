import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import React from "react";
import { Controller } from "react-hook-form";
import TextInput from "../Input/TextInput";

export default function ControllerTextInput({
    control,
    type = "text",
    name,
    title,
    rules,
    icon,
    register,
    placeholder,
    onValueChange,
    error,
    className,
    ...props
}: PropTypes) {
    return (
        <div className={` py-[10px] ${className}`} {...props}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange, ...field } }) => (
                    <TextInput
                        type={type}
                        className=""
                        title={title}
                        icon={icon}
                        placeholder={placeholder}
                        {...register(name)}
                        onChange={(d: any) => {
                            onChange(d);
                            onValueChange(d);
                        }}
                        error={!!error}
                        name={name}
                    />
                )}
            />
            {error && (
                <p className="mt-2 text-sm text-color-error">{error.message}</p>
            )}
        </div>
    );
}

type PropTypes = {
    control: any;
    name: string;
    title: string;
    type?: string;
    icon?: any;
    placeholder?: string;
    rules: any;
    onValueChange: any;
    register: any;
    error: any;
} & React.ComponentPropsWithoutRef<"div"> &
    ReactNodeChildren;
