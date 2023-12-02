import viewCategoryList from "@/api/category/viewCategoryList";
import Category from "@/types/entity/Category";
import React from "react";
import { useQuery } from "react-query";
import Filter from "../Filter/Filter";
import { usePathname, useRouter } from "next/navigation";
import withQuery from "@/utils/withQuery";
import SEARCH_PARAMS from "@/constants/searchParams";
import { useSearchParams } from "next/navigation";

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
