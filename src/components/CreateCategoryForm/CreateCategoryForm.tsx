"use client";

import viewCategoryList from "@/api/category/viewCategoryList.api";
import useLoading from "@/hooks/useLoading";
import Category from "@/types/entity/Category";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useCreateCategoryModal } from "./CreateCategoryFormModal";
import toast from "react-hot-toast";
import OperationStateToast from "../OperationStateToast/OperationStateToast";
import CreateCategoryFormUI from "./CreateCategoryFormUI";
import addNewCategory from "@/api/category/addNewCategory.api";

export default function CreateCategoryForm() {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<
        Category[]
    >(["category"], viewCategoryList);
    const { openLoading, closeLoading } = useLoading();

    const { refetchCategoryList, closeCreateCategoryModal } =
        useCreateCategoryModal();

    const { mutate } = useMutation(addNewCategory, {
        onMutate: () => {
            openLoading("Creating Category...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetchCategoryList?.();
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess
                        content="Creating Category successfully"
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
            closeCreateCategoryModal();
        },
        onError: (error: any, data) => {
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess={false}
                        t={t}
                        title={error.message}
                        content="Fail to create Category"
                        retry={() => mutate(data)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    return (
        <CreateCategoryFormUI
            categories={categories}
            isCategoryLoading={isCategoriesLoading}
            onSubmitData={(data) => mutate(data)}
        />
    );
}

