import viewCategoryList from "@/api/category/viewCategoryList.api";
import { useQuery } from "react-query";
import ProductSearchUI from "./ProductSearchUI";

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

