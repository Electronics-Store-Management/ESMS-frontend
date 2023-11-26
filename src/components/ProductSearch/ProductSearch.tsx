import { useQuery } from "react-query";
import ProductSearchUI from "./ProductSearchUI";
import { useRef, useState } from "react";
import viewCategoryList from "@/api/product/viewCategoryList";
import Category from "@/types/entity/Category";

export default function ProductSearch(
    props: Omit<React.ComponentPropsWithoutRef<"div">, "onClick">,
) {
    const [categoryName, setCategoryName] = useState<string | undefined>();
    const [isCategoryClicked, setIsCategoryClicked] = useState(false);

    const { data: categories, isLoading: isCategoryLoading } = useQuery(
        ["category"],
        viewCategoryList,
        {},
    );

    return (
        <ProductSearchUI
            isCategoryLoading={isCategoryLoading}
            onCategoryChange={(category?: Category) =>
                setCategoryName(category?.name)
            }
            onCategoryDropdownClicked={() => setIsCategoryClicked(true)}
            categories={categories}
        ></ProductSearchUI>
    );
}
