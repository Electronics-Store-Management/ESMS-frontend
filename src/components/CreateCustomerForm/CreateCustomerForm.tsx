"use client";

import addNewSupplier from "@/api/supplier/addNewSupplier.api";
import useLoading from "@/hooks/useLoading";
import { useMutation } from "react-query";
import {
    createFailToast,
    createSuccessToast,
} from "../OperationStateToast/OperationStateToast";
import { useCreateCustomerModal } from "./CreateCustomerFormModal";
import CreateCustomerFormUI from "./CreateCustomerFormUI";
import addNewCustomer from "@/api/customer/addNewCustomer.api";

export default function CreateCustomerForm() {
    const { openLoading, closeLoading } = useLoading();

    const { refetch, close } = useCreateCustomerModal();

    const { mutate } = useMutation(addNewCustomer, {
        onMutate: () => {
            openLoading("Creating customer...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetch?.();
            createSuccessToast("Success", "Create customer successfully");
            close();
        },
        onError: (error: any, data) => {
            console.log({ error });
            createFailToast(
                "Fail to create customer",
                error.response.data.errors.join("\n"),
            );
        },
    });

    return <CreateCustomerFormUI onSubmitData={(data) => mutate(data)} />;
}
