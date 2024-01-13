"use client";

import addNewSupplier from "@/api/supplier/addNewSupplier.api";
import useLoading from "@/hooks/useLoading";
import { useMutation } from "react-query";
import {
    createFailToast,
    createSuccessToast,
} from "../OperationStateToast/OperationStateToast";
import { useCreateSupplierModal } from "./CreateSupplierFormModal";
import CreateSupplierFormUI from "./CreateSupplierFormUI";

export default function CreateSupplierForm() {
    const { openLoading, closeLoading } = useLoading();

    const { refetch, close } = useCreateSupplierModal();

    const { mutate } = useMutation(addNewSupplier, {
        onMutate: () => {
            openLoading("Creating supplier...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetch?.();
            createSuccessToast("Success", "Create supplier successfully");
            close();
        },
        onError: (error: any, data) => {
            console.log({ error });
            createFailToast(
                "Fail to create supplier",
                error.response.data.errors.join("\n"),
            );
        },
    });

    return <CreateSupplierFormUI onSubmitData={(data) => mutate(data)} />;
}
