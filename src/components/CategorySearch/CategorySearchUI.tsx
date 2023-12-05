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
import { useRouter, useSearchParams } from "next/navigation";

export default function CategorySearchUI({
    onSearch = () => {},
    onCategorySearchChange = () => {},
    isCategoryLoading,
    ...props
}: PropTypes) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryNameRef = useRef<HTMLInputElement>(null);

    return (
        <div {...props}>
            <ButtonFlowbite.Group>
                <TextInputFlowbite
                    ref={categoryNameRef}
                    theme={textInputTheme}
                    defaultValue={searchParams.get(SEARCH_PARAMS.name) || ""}
                    placeholder="Enter category name here..."
                    sizing="md"
                />
                <Button
                    size="md"
                    pill
                    isLoading={isCategoryLoading}
                    onClick={() => {
                        router.push(
                            withQuery("/category", {
                                [SEARCH_PARAMS.name]:
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
    field: {
        input: {
            withAddon: {
                off: "rounded-none rounded-s-lg w-[240px]",
            },
        },
    },
};

type PropTypes = React.ComponentPropsWithRef<"div"> & {
    onCategorySearchChange?: (keyword: string) => any;
    onSearch?: () => any;
    isCategoryLoading?: boolean;
    categories?: Category[];
};

