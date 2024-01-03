import {
    createFailToast,
    createSuccessToast,
} from "@/components/OperationStateToast/OperationStateToast";
import useLoading from "@/hooks/useLoading";
import Supplier from "@/types/entity/Supplier";
import { useMutation } from "react-query";
import apiInstance from "../apiInstance";
import Customer from "@/types/entity/Customer";

export default async function deleteCustomerAPI(customer?: Customer | string) {
    const response = await apiInstance.delete(
        `/customer/${typeof customer == "string" ? customer : customer?.id}`,
    );

    return response.data;
}

export function useDeleteCustomerMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteCustomerAPI, {
        onMutate: () => {
            openLoading("Deleting customer...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res, data) => {
            refetch();
            closeLoading();
            createSuccessToast("Success", "Delete customer successfully");
        },
        onError: (error: any, data) => {
            closeLoading();
            createFailToast("Fail to delete customer", error.message);
        },
    });

    return deleteMutation;
}
