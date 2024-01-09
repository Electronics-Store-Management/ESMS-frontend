import {
    Button as ButtonFlowbite,
    CustomFlowbiteTheme,
    Dropdown,
} from "flowbite-react";

import { findCustomer } from "@/api/customer/viewCustomerList.api";
import Customer from "@/types/entity/Customer";
import { capitalize } from "lodash";
import React, { useState } from "react";
import SearchInput from "../SearchInput/SearchInput.tsx";

export default function CustomerSelection({
    onSearch = (id: Customer) => {},
    toggleCreating,
    className,
    ...props
}: PropTypes) {
    const [chosen, setChosen] = useState<number>(0);

    return (
        <div className={` w-full ${className}`} {...props}>
            <ButtonFlowbite.Group className=" w-full">
                <Dropdown
                    theme={dropdownTheme}
                    label={capitalize(findingMethod[chosen])}
                    dismissOnClick={true}
                    size="sm"
                >
                    {findingMethod.map((method, index) => (
                        <Dropdown.Item
                            theme={dropdownTheme?.floating?.item}
                            onClick={() => setChosen(index)}
                            key={method}
                        >
                            <p className=" w-full text-start">
                                {capitalize(method)}
                            </p>
                        </Dropdown.Item>
                    ))}
                </Dropdown>
                <SearchInput
                    placeholder={`Enter ${findingMethod[chosen]} here...`}
                    queryInfo={{
                        queryKeys: ["warranty bills", findingMethod[chosen]],
                        queryFunc: findCustomer,
                    }}
                    template={(item: Customer) => (
                        <div className="px-3 py-2 ">
                            <p className=" mb-1 text-secondary-950 text-sm font-semibold ">
                                {item.name}
                            </p>
                            <p className="text-secondary-950 text-sm ">
                                {item.phone}
                            </p>
                        </div>
                    )}
                    className="w-full"
                    onSelect={(customer: Customer) => onSearch?.(customer)}
                    toggleCreating={
                        toggleCreating
                            ? (value: string) =>
                                  toggleCreating(value, findingMethod[chosen])
                            : undefined
                    }
                />
            </ButtonFlowbite.Group>
        </div>
    );
}

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-2 h-4 w-4 text-secondary-950",
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
        target: " w-fit bg-primary-100 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper: "flex items-center justify-between",
};

const textInputTheme: CustomFlowbiteTheme["textInput"] = {
    field: {
        input: {
            withAddon: {
                off: "rounded-none w-[240px]",
            },
        },
    },
};

const findingMethod = ["name", "phone"] as const;

interface PropTypes extends React.ComponentPropsWithRef<"div"> {
    onSearch?: (id: Customer) => any;
    toggleCreating?: (value: string, type: string) => any;
}
