"use client";

import viewCategoryList from "@/api/category/viewCategoryList.api";
import addNewProduct from "@/api/product/addNewProduct.api";
import useLoading from "@/hooks/useLoading";
import Category from "@/types/entity/Category";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import OperationStateToast from "../OperationStateToast/OperationStateToast";
import UpdateProductFormUI from "./UpdateStaffFormUI";
import { useUpdateStaffModal } from "./UpdateStaffFormModal";
import addNewStaff from "@/api/staff/addNewStaff";
import Staff from "@/types/entity/Staff";
import viewStaffDetail from "@/api/staff/viewStaffDetail.api";
import UpdateStaffFormUI from "./UpdateStaffFormUI";

import Loading from "../Loading/Loading";
import updateStaffAPI from "@/api/staff/updateStaff.api";

export default function UpdateStaffForm({ staffId }: PropTypes) {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<
        Category[]
    >(["category"], viewCategoryList);
    const { openLoading, closeLoading } = useLoading();

    const { refetchStaffList, closeUpdateStaffModal } = useUpdateStaffModal();

    const { data: staff, isLoading: isStaffLoading } = useQuery<Staff>(
        ["staff", staffId],
        viewStaffDetail,
        {
            refetchOnMount: "always",
            cacheTime: 0,
        },
    );

    const { mutate } = useMutation(updateStaffAPI, {
        onMutate: () => {
            openLoading("Updating staff information...");
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
                        content="Updating staff information successfully"
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
            closeUpdateStaffModal();
        },
        onError: (error: any, data) => {
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess={false}
                        t={t}
                        title={error.message}
                        content="Fail to update staff"
                        retry={() => mutate(data)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    return isStaffLoading ? (
        <Loading className="p-8" />
    ) : (
        <UpdateStaffFormUI
            staff={staff}
            onSubmitData={(data) => mutate(data)}
        />
    );
}

type PropTypes = {
    staffId?: string;
};
