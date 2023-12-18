import React, { useRef } from "react";
import {
    Button as ButtonFlowbite,
    TextInput as TextInputFlowbite,
    CustomFlowbiteTheme,
} from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "../Button/Button";
import SEARCH_PARAMS from "@/constants/searchParams";
import withQuery from "@/utils/withQuery";
import Category from "@/types/entity/Category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategorySearchUI({
    onSearch = () => {},
    onCategorySearchChange = () => {},
    isCategoryLoading,
    className,
    ...props
}: PropTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const categoryNameRef = useRef<HTMLInputElement>(null);

    return (
        <div {...props} className={className}>
            <ButtonFlowbite.Group className="w-full">
                <TextInputFlowbite
                    ref={categoryNameRef}
                    theme={textInputTheme}
                    defaultValue={
                        searchParams.get(SEARCH_PARAMS.categoryName) || ""
                    }
                    placeholder="Enter category name here..."
                    sizing="md"
                />
                <Button
                    size="md"
                    pill
                    isLoading={isCategoryLoading}
                    onClick={() => {
                        router.push(
                            withQuery(pathname, {
                                [SEARCH_PARAMS.categoryName]:
                                    categoryNameRef.current?.value,
                            }),
                        );
                    }}
                >
                    <HiOutlineSearch className="h-4 w-4" />
                </Button>
            </ButtonFlowbite.Group>
        </div>
    );
}

const textInputTheme: CustomFlowbiteTheme["textInput"] = {
    base: "w-full",
    field: {
        input: {
            withAddon: {
                off: "rounded-none rounded-s-lg w-full",
            },
        },
    },
};

type PropTypes = React.ComponentPropsWithRef<"div"> & {
    onCategorySearchChange?: (keyword: string) => any;
    onSearch?: () => any;
    isCategoryLoading?: boolean;
    categories?: Category[];
    className?: string;
};
