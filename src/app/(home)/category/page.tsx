"use client";

import Button from "@/components/Button/Button";
import { useSearchParams } from "next/navigation";
import { HiPlus } from "react-icons/hi";
import { useQuery } from "react-query";
import Category from "@/types/entity/Category";
import SEARCH_PARAMS from "@/constants/searchParams";
import viewCategoryList from "@/api/category/viewCategoryList.api";
import { useCreateCategoryModal } from "@/components/CreateCategoryForm/CreateCategoryFormModal";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import DataTable from "@/components/DataTable/DataTable";
import CategorySearch from "@/components/CategorySearch/CategorySearch";

export default function Page() {
    const searchParams = useSearchParams();

    const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";

    const { openCreateCategoryModal } = useCreateCategoryModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<Category[]>(
        ["categories", category],
        viewCategoryList,
        {
            retry: false,
        },
    );

    return (
        <>
            <div className=" w-full grid grid-cols-2">
                <CategorySearch className="" />
                <div className=" flex justify-end gap-8">
                    <Button
                        size="md"
                        onClick={() => openCreateCategoryModal(refetch)}
                    >
                        <HiPlus className=" w-4 h-4 mr-2" />
                        New category
                    </Button>
                </div>
            </div>
            <DataTable
                data={data || []}
                isLoading={isLoading}
                // onDelete={(product) => {
                //     openClaimModal(
                //         <>
                //             Do you want to delete product{" "}
                //             <span>{product.name}</span>
                //         </>,
                //         (confirm) =>
                //             confirm && deleteProductMutation.mutate(product),
                //     );
                // }}
                // onEdit={(product) => {
                //     openUpdateProductModal(product.id, refetch);
                // }}
                pick={{
                    name: { title: "Name" },
                }}
            />
        </>
    );
}

