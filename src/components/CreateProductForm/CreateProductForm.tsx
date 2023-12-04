"use client";

import viewCategoryList from "@/api/category/viewCategoryList.api";
import addNewProduct from "@/api/product/addNewProduct.api";
import useLoading from "@/hooks/useLoading";
import Category from "@/types/entity/Category";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import OperationStateToast from "../OperationStateToast/OperationStateToast";
import { useCreateProductModal } from "./CreateProductFormModal";
import CreateProductFormUI from "./CreateProductFormUI";

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
                    <OperationStateToast
                        isSuccess
                        content="Creating product successfully"
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
                    <OperationStateToast
                        isSuccess={false}
                        t={t}
                        title={error.message}
                        content="Fail to create product"
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

