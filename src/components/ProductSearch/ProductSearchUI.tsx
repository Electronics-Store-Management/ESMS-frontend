import {
    Button as ButtonFlowbite,
    CustomFlowbiteTheme,
    Dropdown,
    Spinner,
    TextInput as TextInputFlowbite,
} from "flowbite-react";
import { HiOutlineCheck, HiOutlineSearch } from "react-icons/hi";
import { BiSolidCategory } from "react-icons/bi";

import Category from "@/types/entity/Category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import SEARCH_PARAMS from "../../constants/searchParams";
import withQuery from "../../utils/withQuery";
import Button from "../Button/Button";
import useScreen from "@/hooks/useScreen";
import MenuButton from "../SideBar/MenuButton";

export default function ProductSearchUI({
    onCategoryChange = () => {},
    onProductSearchChange = () => {},
    onCategoryDropdownClicked = () => {},
    onSearch = () => {},
    isCategoryLoading = false,
    isProductLoading = false,
    categories = [],
    ...props
}: PropTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState<Category | undefined>();
    const productNameRef = useRef<HTMLInputElement>(null);

    useDeepCompareEffect(() => {
        onCategoryChange(category);
    }, [category]);

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <div {...props}>
            <ButtonFlowbite.Group className=" w-full">
                {isMobile ? (
                    <MenuButton className=" bg-secondary-50 px-3 rounded-l-lg rounded-r-none" />
                ) : (
                    <Dropdown
                        theme={dropdownTheme}
                        label={
                            screen("sm") ? (
                                <p className=" text-primary-700">
                                    {category?.name || "All categories"}
                                </p>
                            ) : (
                                <BiSolidCategory className=" text-primary-700" />
                            )
                        }
                        dismissOnClick={true}
                        onClick={onCategoryDropdownClicked}
                        size="sm"
                    >
                        {isCategoryLoading ? (
                            <div className=" my-2 flex gap-2 justify-center items-center">
                                <Spinner size="sm" />
                                <p className=" text-sm text-secondary-900">
                                    Loading...
                                </p>
                            </div>
                        ) : (
                            <>
                                {categories.map((category_) => (
                                    <Dropdown.Item
                                        theme={dropdownTheme?.floating?.item}
                                        onClick={() => setCategory(category_)}
                                        key={category_.id}
                                        icon={
                                            category?.name === category_.name
                                                ? HiOutlineCheck
                                                : null
                                        }
                                    >
                                        <p className=" w-full text-start">
                                            {category_.name}
                                        </p>
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Item
                                    theme={dropdownTheme?.floating?.item}
                                    onClick={() => setCategory(undefined)}
                                    icon={category ? null : HiOutlineCheck}
                                >
                                    <p className="  w-full text-start font-medium text-primary-300">
                                        All categories
                                    </p>
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown>
                )}
                <TextInputFlowbite
                    ref={productNameRef}
                    theme={textInputTheme}
                    sizing={screen("sm") ? "md" : "sm"}
                    defaultValue={
                        searchParams.get(SEARCH_PARAMS.productName) || ""
                    }
                    placeholder="Enter product name here..."
                />
                <Button
                    size="sm"
                    pill
                    isLoading={isProductLoading}
                    onClick={() => {
                        router.push(
                            withQuery(pathname, {
                                [SEARCH_PARAMS.productName]:
                                    productNameRef.current?.value,
                                [SEARCH_PARAMS.categoryName]: category?.name,
                            }),
                        );
                    }}
                >
                    <HiOutlineSearch className=" h-4 w-4" />
                </Button>
            </ButtonFlowbite.Group>
        </div>
    );
}

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-2 h-4 w-4 text-primary-700",
    content: "py-1 text-secondary-600 focus:outline-none",
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
    base: "flex-1",
    field: {
        input: {
            base: " bg-secondary-50",
            withAddon: {
                off: "rounded-none w-full",
            },
            colors: {
                gray: "bg-secondary-50 border-secondary-900 text-secondary-900 focus:border-primary-500 focus:ring-primary-500 placeholder-secondary-500 ",
            },
            sizes: {
                sm: "p-2 text-secondary-900 text-xs",
            },
        },
    },
};

type PropTypes = React.ComponentPropsWithRef<"div"> & {
    onCategoryChange?: (category?: Category) => any;
    onProductSearchChange?: (keyword: string) => any;
    onSearch?: () => any;
    onCategoryDropdownClicked?: () => any;
    isCategoryLoading?: boolean;
    isProductLoading?: boolean;
    categories?: Category[];
};
