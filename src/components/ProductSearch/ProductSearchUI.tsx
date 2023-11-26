import {
    Button as ButtonFlowbite,
    CustomFlowbiteTheme,
    Dropdown,
    Spinner,
    TextInput as TextInputFlowbite,
} from "flowbite-react";
import { HiOutlineCheck, HiOutlineSearch } from "react-icons/hi";

import Category from "@/types/entity/Category";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import withQuery from "../../utils/withQuery";
import SEARCH_PARAMS from "@/constants/searchParams";

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

    const [category, setCategory] = useState<Category | undefined>();
    const productNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        onCategoryChange(category);
    }, [category?.id]);

    return (
        <div {...props}>
            <ButtonFlowbite.Group>
                <Dropdown
                    theme={dropdownTheme}
                    label={category?.name || "All categories"}
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
                <TextInputFlowbite
                    ref={productNameRef}
                    theme={textInputTheme}
                    sizing="md"
                />
                <Button
                    size="sm"
                    pill
                    isLoading={isProductLoading}
                    onClick={() => {
                        router.push(
                            withQuery("/product", {
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
                off: "rounded-none",
            },
        },
    },
};

type PropTypes = {
    onCategoryChange?: (category?: Category) => any;
    onProductSearchChange?: (keyword: string) => any;
    onSearch?: () => any;
    onCategoryDropdownClicked?: () => any;
    isCategoryLoading?: boolean;
    isProductLoading?: boolean;
    categories?: Category[];
} & React.ComponentPropsWithRef<"div">;
