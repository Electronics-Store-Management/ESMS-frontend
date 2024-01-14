import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import React from "react";
import { Controller } from "react-hook-form";
import TextInput from "../Input/TextInput";
import { Textarea } from "flowbite-react";

export default function ControllerTextarea({
    control,
    type = "text",
    id,
    name,
    title,
    rules,
    icon,
    register,
    placeholder,
    onValueChange,
    defaultValue,
    error,
    className,
    rows,
    ...props
}: PropTypes) {
    return (
        <div className={` py-[10px] ${className}`} {...props}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange, ...field } }) => (
                    <Textarea
                        id={id}
                        type={type}
                        className=" bg-background-secondary text-secondary-900"
                        title={
                            <p className=" text-secondary-900 font-medium">
                                {title}
                            </p>
                        }
                        icon={icon}
                        rows={rows}
                        defaultValue={defaultValue}
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
    rows: number;
} & React.ComponentPropsWithoutRef<"div"> &
    ReactNodeChildren;
