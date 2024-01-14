import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import BaseEntity from "@/types/entity/BaseEntity";
import { CustomFlowbiteTheme, Dropdown, DropdownItem } from "flowbite-react";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import FONT from "../../utils/fontFamily";

export default function ControllerSelectInput<
    T extends BaseEntity & { name: string },
>({
    control,
    name,
    title,
    defaultValue,
    onValueChange = () => {},
    choseValue = "",
    items,
    isLoading,
    className,
    ...props
}: PropTypes<T>) {
    const [selected, setSelected] = useState<string>(defaultValue || "");

    return (
        <div className={` py-[10px] ${className}`} {...props}>
            <p
                className={`${FONT.primary.className} mb-2 font-semibold text-sm text-secondary-900`}
            >
                {title}
            </p>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, ...field } }) => (
                    <Dropdown
                        theme={dropdownTheme}
                        label={
                            selected || (
                                <p className=" font-normal text-secondary-600">
                                    Not choose
                                </p>
                            )
                        }
                        dismissOnClick={true}
                    >
                        <DropdownItem
                            onClick={() => {
                                onValueChange("");
                                setSelected("");
                            }}
                        >
                            <p className=" font-normal text-secondary-600">
                                Not choose
                            </p>
                        </DropdownItem>
                        {items?.map((value) => (
                            <DropdownItem
                                key={value.id}
                                onClick={() => {
                                    onValueChange(value?.id);
                                    setSelected(value?.name);
                                }}
                            >
                                {value.name}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                )}
            />
        </div>
    );
}

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "absolute right-2 ml-2 h-4 w-4 text-secondary-950",
    content: "py-1 text-secondary-900 focus:outline-none",
    floating: {
        animation: "transition-opacity",
        arrow: {
            base: "absolute z-10 h-2 w-2 rotate-45",
            style: {
                light: "bg-secondary-900",
                auto: "bg-secondary-900",
            },
            placement: "-4px",
        },
        base: "z-10 w-fit bg-background-secondary rounded divide-y divide-secondary-100 shadow focus:outline-none",
        content: "py-1 text-sm text-secondary-700  bg-background-secondary",
        divider: "my-1 h-px bg-secondary-100 ",
        header: "block py-2 px-4 text-sm text-secondary-700",
        hidden: "invisible opacity-0",
        item: {
            container: " bg-background-secondary",
            base: "flex flex-row items-center justify-between  bg-background-secondary py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200  bg-background-secondary  text-secondary-900",
            auto: "border border-secondary-200  bg-background-secondary  text-secondary-900",
        },
        target: " relative w-full flex justify-start border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper:
        "flex  bg-background-secondary  w-full items-center justify-between",
};

type PropTypes<T> = Omit<
    React.ComponentPropsWithoutRef<"div">,
    "defaultValue"
> &
    ReactNodeChildren & {
        control: any;
        name: string;
        title: string;
        items?: T[];
        choseValue?: string;
        isLoading?: boolean;
        onValueChange?: (value?: string) => any;
        defaultValue?: string;
    };
