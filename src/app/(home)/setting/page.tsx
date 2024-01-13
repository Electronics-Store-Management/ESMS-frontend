"use client";

import COOKIE_NAME from "@/constants/cookies";
import THEMES from "@/constants/themes";
import { setCookie } from "cookies-next";
import { CustomFlowbiteTheme, Dropdown, DropdownItem } from "flowbite-react";
import { capitalize } from "lodash";
import { useTheme } from "next-themes";

export default function Page() {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            <div>
                <p>Theme</p>
                <Dropdown
                    theme={dropdownTheme}
                    label={capitalize(theme)}
                    dismissOnClick={true}
                >
                    {THEMES?.map((value) => (
                        <DropdownItem
                            key={value}
                            onClick={() => {
                                setTheme(value);
                                setCookie(COOKIE_NAME.THEME, value);
                            }}
                        >
                            {capitalize(value)}
                        </DropdownItem>
                    ))}
                </Dropdown>
            </div>
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
            container: "",
            base: "flex flex-row items-center justify-between py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full hover:bg-secondary-100 focus:bg-secondary-100 ",
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
