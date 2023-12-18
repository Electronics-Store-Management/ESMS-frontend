import ProductPreview from "@/types/entity/ProductPreview";
import apiInstance from "../apiInstance";
import { useMutation } from "react-query";
import useLoading from "@/hooks/useLoading";
import toast from "react-hot-toast";
import OperationStateToast from "@/components/OperationStateToast/OperationStateToast";
import Staff from "@/types/entity/Staff";

export default async function deleteStaffAPI(staff?: Staff) {
    if (!staff?.id) throw new Error("Invalid staff");

    const response = await apiInstance.delete(`/staff/${staff.id}`);

    return response.data;
}

export function useDeleteStaffMutation(refetch: () => any) {
    const { openLoading, closeLoading } = useLoading();

    const deleteMutation = useMutation(deleteStaffAPI, {
        onMutate: () => {
            openLoading("Deleting staff...");
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
                                Staff <b>{data?.name}</b> is deleted
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
                                Fail to delete staff <b>{data?.name}</b>
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
