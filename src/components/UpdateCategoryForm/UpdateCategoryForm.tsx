import viewCategoryList from "@/api/category/viewCategoryList.api";
import useLoading from "@/hooks/useLoading";
import Category from "@/types/entity/Category";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import OperationStateToast from "../OperationStateToast/OperationStateToast";
import Loading from "../Loading/Loading";
import { useUpdateCategoryModal } from "./UpdateCategoryFormModal";
import viewDetailCategory from "@/api/category/viewDetailCategory.api";
import updateCategoryAPI from "@/api/category/updateCategory.api";
import UpdateCategoryFormUI from "./UpdateCategoryFormUI";

export default function UpdateCategoryForm({ categoryId }: PropTypes) {
    const { openLoading, closeLoading } = useLoading();

    const { refetchCategoryList } = useUpdateCategoryModal();

    const { data: category, isLoading: isCategoryLoading } = useQuery<Category>(
        ["category", categoryId],
        viewDetailCategory,
        {
            refetchOnMount: "always",
            cacheTime: 0,
        },
    );

    const { closeUpdateCategoryModal } = useUpdateCategoryModal();

    const { mutate } = useMutation(updateCategoryAPI, {
        onMutate: () => {
            openLoading("Updating category...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (_, data) => {
            refetchCategoryList?.();
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess
                        content={`Updating category successfully`}
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
            closeUpdateCategoryModal();
        },
        onError: (error: any, data) => {
            toast.custom(
                (t) => (
                    <OperationStateToast
                        isSuccess={false}
                        t={t}
                        title={error.message}
                        content={`Fail to update category ${data.name}`}
                        retry={() => mutate(data)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    return (
        <>
            {isCategoryLoading ? (
                <Loading className="p-8" />
            ) : (
                <UpdateCategoryFormUI
                    onSubmitData={(data) => mutate(data)}
                    isLoading={isCategoryLoading}
                    category={category}
                />
            )}
        </>
    );
}

type PropTypes = {
    categoryId: string;
};
