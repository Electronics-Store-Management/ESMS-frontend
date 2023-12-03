import { useQuery } from "react-query";
import ProductSearchUI from "./ProductSearchUI";
import { useRef, useState } from "react";
import viewCategoryList from "@/api/category/viewCategoryList";
import Category from "@/types/entity/Category";

export default function ProductSearch(
    props: Omit<React.ComponentPropsWithoutRef<"div">, "onClick">,
) {
    const { data: categories, isLoading: isCategoryLoading } = useQuery(
        ["category"],
        viewCategoryList,
        {},
    );

    return (
        <ProductSearchUI
            isCategoryLoading={isCategoryLoading}
            categories={categories}
            {...props}
        ></ProductSearchUI>
    );
}
