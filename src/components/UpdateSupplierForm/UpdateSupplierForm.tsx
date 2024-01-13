"use client";

import addNewSupplier from "@/api/supplier/addNewSupplier.api";
import viewDetailSupplier from "@/api/supplier/viewDetailSupplier";
import useLoading from "@/hooks/useLoading";
import Supplier from "@/types/entity/Supplier";
import { useMutation, useQuery } from "react-query";
import {
    createFailToast,
    createSuccessToast,
} from "../OperationStateToast/OperationStateToast";
import { useUpdateSupplierModal } from "./UpdateSupplierFormModal";
import UpdateSupplierFormUI from "./UpdateSupplierFormUI";
import updateSupplierAPI from "@/api/supplier/updateSupplier.api";
import { AxiosError } from "axios";
import Loading from "../Loading/Loading";

export default function UpdateSupplierForm() {
    const { openLoading, closeLoading } = useLoading();

    const { supplierId, refetch, close } = useUpdateSupplierModal();

    const { data: supplier, isLoading } = useQuery<Supplier>(
        ["supplier", supplierId],
        viewDetailSupplier,
        {
            refetchOnMount: "always",
            cacheTime: 0,
        },
    );

    const { mutate } = useMutation(updateSupplierAPI, {
        onMutate: () => {
            openLoading("Updating supplier...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetch?.();
            createSuccessToast("Success", "Update supplier successfully");
            close();
        },
        onError: (error: any, data) => {
            console.log({ error });
            createFailToast(
                "Fail to update supplier",
                error.response.data.errors.join("\n"),
            );
        },
    });

    return (
        <>
            {isLoading ? (
                <Loading className="p-8" />
            ) : (
                <UpdateSupplierFormUI
                    supplier={supplier}
                    onSubmitData={(data) => mutate(data)}
                />
            )}
        </>
    );
}
