import viewCategoryList from "@/api/category/viewCategoryList.api";
import { useQuery } from "react-query";
import CategorySearchUI from "./CategorySearchUI";

export default function CategorySearch(
    props: Omit<React.ComponentPropsWithoutRef<"div">, "onClick">,
) {
    const { data: categories, isLoading: isCategoryLoading } = useQuery(
        ["category"],
        viewCategoryList,
        {},
    );

    return (
        <CategorySearchUI
            isCategoryLoading={isCategoryLoading}
            categories={categories}
            {...props}
        ></CategorySearchUI>
    );
}

