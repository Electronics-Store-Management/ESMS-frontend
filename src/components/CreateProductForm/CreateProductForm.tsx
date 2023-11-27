import viewCategoryList from "@/api/category/viewCategoryList";
import CreateProductFormUI from "./CreateProductFormUI";
import Category from "@/types/entity/Category";
import { useMutation, useQuery } from "react-query";
import addNewProduct from "@/api/product/addNewProduct.api";

export default function CreateProductForm() {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<
        Category[]
    >(["category"], viewCategoryList);

    const { mutate } = useMutation(addNewProduct, {});

    return (
        <CreateProductFormUI
            categories={categories}
            isCategoryLoading={isCategoriesLoading}
            onSubmitData={(data) => mutate(data)}
        />
    );
}
