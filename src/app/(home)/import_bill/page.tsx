"use client";

import viewImportList from "@/api/import/viewImportList.api";
import DataTable from "@/components/DataTable/DataTable";
import ImportBillDateFilter from "@/components/ImportBillDateFilter/ImportBillDateFilter";
import ImportBill from "@/types/entity/ImportBill";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const Page = () => {
    const onDateFilter = (start: Date, end: Date) => {
        //TODO: Filter by date
    };

    const searchParams = useSearchParams();

    // const rangeDate = searchParams.get(SEARCH_PARAMS.rangeDate) || "";

    const { data, isLoading, refetch } = useQuery<ImportBill[]>(
        ["import"],
        viewImportList,
        {
            retry: false,
        },
    );

    return (
        <>
            <div className="w-full mb-8">
                {/* <ImportBillSearch /> */}
                <ImportBillDateFilter
                    onSearch={(start, end) => onDateFilter(start, end)}
                />
            </div>
            <div>
                <DataTable
                    data={data || []}
                    isLoading={isLoading}
                    onDelete={(category) => {
                        // openClaimModal(
                        //     <>
                        //         Do you want to delete category{" "}
                        //         <span>{category.name}</span>
                        //     </>,
                        //     (confirm) =>
                        //         confirm &&
                        //         deleteCategoryMutation.mutate(category),
                        // );
                    }}
                    onEdit={(category) => {
                        // openUpdateCategoryModal(category.id, refetch);
                    }}
                    pick={{
                        id: { title: "Code" },
                        supplierId: { title: "Supplier" },
                        staffId: { title: "Staff" },
                    }}
                />
            </div>
        </>
    );
};

export default Page;
