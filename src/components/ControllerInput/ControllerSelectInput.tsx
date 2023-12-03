import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import FONT from "../../utils/fontFamily";
import { CustomFlowbiteTheme, Dropdown } from "flowbite-react";
import { Controller } from "react-hook-form";
import React, { useState } from "react";
import BaseEntity from "@/types/entity/BaseEntity";
import Category from "@/types/entity/Category";

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
    const [selected, setSelected] = useState<string>(defaultValue?.name || "");

    return (
        <div className={` py-[10px] ${className}`} {...props}>
            <p
                className={`${FONT.primary.className} mb-2 font-semibold text-sm`}
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
                        <Dropdown.Item onClick={() => onValueChange(undefined)}>
                            <p className=" font-normal text-secondary-600">
                                Not choose
                            </p>
                        </Dropdown.Item>
                        {items?.map((value) => (
                            <Dropdown.Item
                                key={value.id}
                                onClick={() => {
                                    onValueChange(value?.id);
                                    setSelected(value?.name);
                                }}
                            >
                                {value.name}
                            </Dropdown.Item>
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
        base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
        content: "py-1 text-sm text-gray-700",
        divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
        header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
        hidden: "invisible opacity-0",
        item: {
            container: " w-[180px]",
            base: "flex flex-row-reverse items-center justify-between py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200 bg-white text-secondary-900",
            auto: "border border-secondary-200 bg-white text-secondary-900",
        },
        target: " relative w-full flex justify-start border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper: "flex w-full items-center justify-between",
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
        defaultValue?: Category;
    };
