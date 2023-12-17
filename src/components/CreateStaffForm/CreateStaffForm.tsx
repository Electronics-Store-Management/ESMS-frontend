"use client";

import viewCategoryList from "@/api/category/viewCategoryList.api";
import addNewProduct from "@/api/product/addNewProduct.api";
import useLoading from "@/hooks/useLoading";
import Category from "@/types/entity/Category";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import OperationStateToast from "../OperationStateToast/OperationStateToast";
import CreateProductFormUI from "./CreateStaffFormUI";
import { useCreateStaffModal } from "./CreateStaffFormModal";
import addNewStaff from "@/api/staff/addNewStaff";

export default function CreateStaffForm() {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<
        Category[]
    >(["category"], viewCategoryList);
    const { openLoading, closeLoading } = useLoading();

    const { refetchStaffList, closeCreateStaffModal } = useCreateStaffModal();

    const { mutate } = useMutation(addNewStaff, {
        onMutate: () => {
            openLoading("Creating new staff...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetchStaffList?.();
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess
                        content="Creating staff successfully"
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
            closeCreateStaffModal();
        },
        onError: (error: any, data) => {
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess={false}
                        t={t}
                        title={error.message}
                        content="Fail to create staff"
                        retry={() => mutate(data)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    return <CreateProductFormUI onSubmitData={(data) => mutate(data)} />;
}
