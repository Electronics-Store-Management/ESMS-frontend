import viewCategoryList from "@/api/category/viewCategoryList.api";
import SEARCH_PARAMS from "@/constants/searchParams";
import Category from "@/types/entity/Category";
import withQuery from "@/utils/withQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import Filter from "../Filter/Filter";

export default function CategoryFilter({
    onItemChange = () => {},
    ...props
}: PropTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { data, isLoading } = useQuery<Category[]>(
        ["category"],
        viewCategoryList,
    );

    return (
        <Filter
            title="Category"
            items={data?.map((item) => item.name) || []}
            choosen={searchParams.get(SEARCH_PARAMS.categoryName) || ""}
            onItemChange={(item) =>
                router.push(
                    withQuery(
                        pathname,
                        {
                            [SEARCH_PARAMS.categoryName]: item,
                        },
                        searchParams,
                    ),
                )
            }
            isLoading={isLoading}
            {...props}
        />
    );
}

type PropTypes = { onItemChange?: (item: string) => any } & Omit<
    React.ComponentPropsWithoutRef<"div">,
    "onClick"
>;
