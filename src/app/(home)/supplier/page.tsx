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
import { useDeleteCategoryMutation } from "@/api/category/deleteCategory.api";
import { useUpdateCategoryModal } from "@/components/UpdateCategoryForm/UpdateCategoryFormModal";
import FilterBadge from "@/components/FilterBadge/FilterBadge";

export default function Page() {
    const searchParams = useSearchParams();

    const categoryKeyword = searchParams.get(SEARCH_PARAMS.categoryName) || "";

    const { openCreateCategoryModal } = useCreateCategoryModal();
    const { openUpdateCategoryModal } = useUpdateCategoryModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<Category[]>(
        ["categories", categoryKeyword],
        viewCategoryList,
        {
            retry: false,
        },
    );

    const deleteCategoryMutation = useDeleteCategoryMutation(refetch);

    return (
        <div className="grid grid-cols-4 gap-5">
            <div></div>
            <div className="col-span-2">
                <CategorySearch className="w-full mb-4" />
                <FilterBadge
                    title={"Category name"}
                    searchParamName={SEARCH_PARAMS.categoryName}
                    type={"search"}
                    className=" mb-6"
                />
                <DataTable
                    data={data || []}
                    isLoading={isLoading}
                    onDelete={(category) => {
                        openClaimModal(
                            <>
                                Do you want to delete category{" "}
                                <span>{category.name}</span>
                            </>,
                            (confirm) =>
                                confirm &&
                                deleteCategoryMutation.mutate(category),
                        );
                    }}
                    onEdit={(category) => {
                        openUpdateCategoryModal(category.id, refetch);
                    }}
                    pick={{
                        name: { title: "Name" },
                    }}
                />
            </div>

            <div className="flex justify-end items-start">
                <Button
                    size="md"
                    onClick={() => openCreateCategoryModal(refetch)}
                >
                    <HiPlus className=" w-4 h-4 mr-2" />
                    New category
                </Button>
            </div>
        </div>
    );
}
