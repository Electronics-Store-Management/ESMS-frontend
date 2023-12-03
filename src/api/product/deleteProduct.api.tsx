import ProductPreview from "@/types/entity/ProductPreview";
import apiInstance from "../apiInstance";
import { useMutation } from "react-query";
import useLoading from "@/hooks/useLoading";
import toast from "react-hot-toast";
import OperationStateToast from "@/components/OperationStateToast/OperationStateToast";

export default async function deleteProductAPI(product?: ProductPreview) {
    if (!product?.id) throw new Error("Invalid product");

    const response = await apiInstance.delete(`/product/${product.id}`);

    return response.data;
}

export function useDeleteProductMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteProductAPI, {
        onMutate: () => {
            openLoading("Deleting product...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res, data) => {
            refetch();
            closeLoading();
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess
                        title="Delete successfully"
                        content={
                            <>
                                Product <b>{data?.name}</b> is deleted
                                successfully
                            </>
                        }
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
        },
        onError: (error: any, data) => {
            closeLoading();
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess={false}
                        t={t}
                        title={error.message}
                        content={
                            <>
                                Fail to delete product <b>{data?.name}</b>
                            </>
                        }
                        retry={() => deleteMutation.mutate(data)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    return deleteMutation;
}
