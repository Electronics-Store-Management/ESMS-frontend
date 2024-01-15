"use client";

import Button from "@/components/Button/Button";
import CheckBox from "@/components/Checkbox/CheckBox";
import LabeledText from "@/components/Typography/LabeledText";
import COOKIE_NAME from "@/constants/cookies";
import { FONT_SIZE } from "@/constants/settingOptions";
import THEMES from "@/constants/themes";
import { getCookie, setCookie } from "cookies-next";
import { CustomFlowbiteTheme, Dropdown, DropdownItem } from "flowbite-react";
import { capitalize } from "lodash";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Page() {
    const { theme, setTheme } = useTheme();

    const selectedSizeCookie = parseInt(
        getCookie(COOKIE_NAME.FONT_SIZE) || "14",
        10,
    );
    const [selectedSize, setSelectedSize] = useState(selectedSizeCookie);

    return (
        <div className=" grid grid-cols-2">
            <div className=" flex flex-col gap-8">
                <LabeledText
                    title={<p className=" pb-2 px-4">Theme</p>}
                    value={
                        <div className=" w-full grid grid-cols-2 gap-5">
                            <Dropdown
                                theme={dropdownTheme}
                                className=""
                                label={capitalize(theme)}
                                dismissOnClick={true}
                            >
                                {THEMES?.map((value) => (
                                    <DropdownItem
                                        key={value}
                                        onClick={() => {
                                            setTheme(value);
                                            setCookie(COOKIE_NAME.THEME, value);
                                            if (value != "system")
                                                setCookie(
                                                    COOKIE_NAME.SELECTED_THEME,
                                                    value,
                                                );
                                        }}
                                        theme={dropdownTheme?.floating?.item}
                                    >
                                        {capitalize(value)}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                            <CheckBox
                                id="theme-setting"
                                onChange={(e) =>
                                    e.target.checked
                                        ? setTheme("system")
                                        : setTheme(
                                              getCookie(
                                                  COOKIE_NAME.SELECTED_THEME,
                                              ) || "light",
                                          )
                                }
                                defaultChecked={theme === "system"}
                            >
                                <p className=" text-secondary-900">
                                    {" "}
                                    Use default system
                                </p>
                            </CheckBox>
                        </div>
                    }
                />

                <div>
                    <p className=" mb-3 px-5 text-sm text-secondary-600 flex gap-1 items-center">
                        Font size
                    </p>
                    <div className=" flex gap-3">
                        {FONT_SIZE.map(({ name, value }) => (
                            <Button
                                key={value}
                                btnType={
                                    value === selectedSize
                                        ? "primary"
                                        : "secondary"
                                }
                                className=" border-[1px]"
                                onClick={() => {
                                    setSelectedSize(value);
                                    setCookie(COOKIE_NAME.FONT_SIZE, value);
                                    const html = document.querySelector("html");
                                    if (html)
                                        html.style.fontSize = `${value}px`;
                                }}
                            >
                                <p style={{ fontSize: value }}> {name}</p>
                            </Button>
                        ))}
                    </div>
                </div>
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
        base: " bg-background-secondary z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
        content: "py-1 text-sm text-gray-700",
        divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
        header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200",
        hidden: "invisible opacity-0",
        item: {
            container: " bg-background-secondary",
            base: " bg-background-secondary flex flex-row items-center justify-between py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200  bg-background-secondary text-secondary-900",
            auto: "border border-secondary-200 bg-background-secondary text-secondary-900",
        },
        target: " relative w-full flex justify-start border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper: "flex w-full  items-center justify-between",
};
