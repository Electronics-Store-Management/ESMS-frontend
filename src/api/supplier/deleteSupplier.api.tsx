import ProductPreview from "@/types/entity/ProductPreview";
import apiInstance from "../apiInstance";
import { useMutation } from "react-query";
import useLoading from "@/hooks/useLoading";
import toast from "react-hot-toast";
import OperationStateToast, {
    createFailToast,
    createSuccessToast,
} from "@/components/OperationStateToast/OperationStateToast";
import Supplier from "@/types/entity/Supplier";

export default async function deleteSupplierAPI(supplier?: Supplier) {
    if (!supplier?.id) throw new Error("Invalid supplier");

    const response = await apiInstance.delete(`/supplier/${supplier.id}`);

    return response.data;
}

export function useDeleteSupplierMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteSupplierAPI, {
        onMutate: () => {
            openLoading("Deleting supplier...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res, data) => {
            refetch();
            closeLoading();
            createSuccessToast("Success", "Create supplier successfully");
        },
        onError: (error: any, data) => {
            closeLoading();
            createFailToast("Fail to create supplier", error.message);
        },
    });

    return deleteMutation;
}
