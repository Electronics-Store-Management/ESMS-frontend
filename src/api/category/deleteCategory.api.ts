import useLoading from "@/hooks/useLoading";
import apiInstance from "../apiInstance";
import { useMutation } from "react-query";
import Category from "@/types/entity/Category";
import toast from "react-hot-toast";
import OperationStateToast from "@/components/OperationStateToast/OperationStateToast";

export default async function deleteCategoryAPI(category?: Category) {
    if (!category?.id) throw new Error("Invalid category");

    const response = await apiInstance.delete(`/category/${category.id}`);

    return response.data;
}

export function useDeleteCategoryMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteCategoryAPI, {
        onMutate: () => {
            openLoading("Deleting category...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res, data) => {
            refetch();
            closeLoading();
            // toast.custom(
            //     (t) => (
            //         <OperationStateToast
            //             isSuccess
            //             title="Delete successfully"
            //             content={
            //                 <>
            //                     Product <b>{data?.name}</b> is deleted
            //                     successfully
            //                 </>
            //             }
            //             t={t}
            //         />
            //     ),
            //     { duration: 3000 },
            // );
        },
        onError: (error: any, data) => {
            closeLoading();
            // toast.custom(
            //     (t) => (
            //         <OperationStateToast
            //             isSuccess={false}
            //             t={t}
            //             title={error.message}
            //             content={
            //                 <>
            //                     Fail to delete product <b>{data?.name}</b>
            //                 </>
            //             }
            //             retry={() => deleteMutation.mutate(data)}
            //         />
            //     ),
            //     { duration: 3000 },
            // );
        },
    });

    return deleteMutation;
}

