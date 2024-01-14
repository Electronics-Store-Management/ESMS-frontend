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
import { usePermission } from "@/hooks/usePermission";
import MobileHeader from "@/components/MobileHeader/MobileHeader";
import useScreen from "@/hooks/useScreen";

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

    const isAllowedCreate = usePermission("CATEGORY", ["CREATE"]);

    const screen = useScreen();
    const isMobile = !screen("sm");

    return (
        <div className="w-full h-full flex flex-col overflow-auto">
            <MobileHeader title="Category" />
            <div className="grid grid-cols-12 grid-rows-[repeat(2,min-content)]  place-items-stretch gap-3">
                <CategorySearch className="w-full col-span-10 sm:col-span-9 lg:col-span-6 col-start-1 lg:col-start-4" />
                <div className=" mt-4 col-span-12 lg:col-span-6 col-start-1 lg:col-start-4 flex flex-col gap-5">
                    <FilterBadge
                        title={"Category name"}
                        searchParamName={SEARCH_PARAMS.categoryName}
                        type={"search"}
                        className=" mb-6 "
                    />
                    <DataTable
                        data={data || []}
                        entityType="CATEGORY"
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
                <div className=" flex justify-end place-items-stretch col-span-2 sm:col-span-3 lg:col-span-3 col-start-12 sm:col-start-10 lg:col-start-10 row-start-1 ">
                    {isAllowedCreate ? (
                        <Button
                            size="sm"
                            onClick={() => openCreateCategoryModal(refetch)}
                            className=" place-items-stretch col-span-1 sm:col-span-2 col-start-6 sm:col-start-5 row-start-1 "
                        >
                            <div className="flex items-center gap-2">
                                <HiPlus className=" w-4 h-4" />
                                {!isMobile ? <p>New category</p> : null}
                            </div>
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
