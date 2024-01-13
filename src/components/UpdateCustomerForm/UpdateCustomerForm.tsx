"use client";

import updateCustomerAPI from "@/api/customer/updateCustomer.api";
import viewDetailCustomer from "@/api/customer/viewDetailCustomer";
import useLoading from "@/hooks/useLoading";
import Customer from "@/types/entity/Customer";
import { useMutation, useQuery } from "react-query";
import Loading from "../Loading/Loading";
import {
    createFailToast,
    createSuccessToast,
} from "../OperationStateToast/OperationStateToast";
import { useUpdateCustomerModal } from "./UpdateCustomerFormModal";
import UpdateCustomerFormUI from "./UpdateCustomerFormUI";

export default function UpdateCustomerForm() {
    const { openLoading, closeLoading } = useLoading();

    const { customerId, refetch, close } = useUpdateCustomerModal();

    const { data: customer, isLoading } = useQuery<Customer>(
        ["customer", customerId],
        viewDetailCustomer,
        {
            refetchOnMount: "always",
            cacheTime: 0,
        },
    );

    const { mutate } = useMutation(updateCustomerAPI, {
        onMutate: () => {
            openLoading("Updating customer...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetch?.();
            createSuccessToast("Success", "Update customer successfully");
            close();
        },
        onError: (error: any, data) => {
            createFailToast(
                "Fail to update customer",
                error.response.data.errors.join("\n"),
            );
        },
    });

    return (
        <>
            {isLoading ? (
                <Loading className="p-8" />
            ) : (
                <UpdateCustomerFormUI
                    customer={customer}
                    onSubmitData={(data) => mutate(data)}
                />
            )}
        </>
    );
}
