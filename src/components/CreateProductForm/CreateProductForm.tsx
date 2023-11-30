"use client";

import viewCategoryList from "@/api/category/viewCategoryList";
import CreateProductFormUI from "./CreateProductFormUI";
import Category from "@/types/entity/Category";
import { useMutation, useQuery } from "react-query";
import addNewProduct from "@/api/product/addNewProduct.api";
import { useCreateProductModal } from "./CreateProductFormModal";
import { CreateProductToast } from "../ToastMessage/CreateProductToast";
import toast from "react-hot-toast";
import useLoading from "@/hooks/useLoading";

export default function CreateProductForm() {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<
        Category[]
    >(["category"], viewCategoryList);
    const { openLoading, closeLoading } = useLoading();

    const { refetchProductList, closeCreateProductModal } =
        useCreateProductModal();

    const { mutate } = useMutation(addNewProduct, {
        onMutate: () => {
            openLoading("Creating product...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetchProductList?.();
            toast.custom(
                (t) => (
                    <CreateProductToast
                        productName={data?.name || ""}
                        isSuccess
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
            closeCreateProductModal();
        },
        onError: (error: any, data) => {
            toast.custom(
                (t) => (
                    <CreateProductToast
                        productName={data?.name || ""}
                        isSuccess={false}
                        t={t}
                        message={error.message}
                        retry={() => mutate(data)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    return (
        <CreateProductFormUI
            categories={categories}
            isCategoryLoading={isCategoriesLoading}
            onSubmitData={(data) => mutate(data)}
        />
    );
}
