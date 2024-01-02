"use client";

import viewImportList from "@/api/import/viewImportList.api";
import DataTable from "@/components/DataTable/DataTable";
import ImportBillDateFilter from "@/components/ImportBillDateFilter/ImportBillDateFilter";
import SEARCH_PARAMS from "@/constants/searchParams";
import Revision from "@/types/Revision";
import ImportBill, { ImportProductResponse } from "@/types/entity/ImportBill";
import FORMATTER from "@/utils/formatter";
import _ from "lodash";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";

const Page = () => {
    // const [startDate, setStartDate] = useState<Date>(new Date());
    // const [endDate, setEndDate] = useState<Date>(new Date());

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onDateFilter = (start: Date, end: Date) => {
        // setStartDate(start);
        // setEndDate(end);
        searchParams.set();
    };

    // const rangeDate = searchParams.get(SEARCH_PARAMS.rangeDate) || "";

    const {
        data: preData,
        isLoading,
        refetch,
    } = useQuery<Revision<ImportBill<ImportProductResponse>>[]>(
        ["import"],
        viewImportList,
        {
            retry: false,
        },
    );

    const data: ImportBillResponse[] = useMemo(
        () =>
            preData?.map(
                (value: Revision<ImportBill<ImportProductResponse>>) => ({
                    ..._.pick(value, ["id", "timestamp", "username"]),
                    supplierId: value.revision.supplierId || "",
                    importProducts: value.revision.importProducts.length,
                }),
            ) || [],
        [preData],
    );

    return (
        <>
            <div className="w-full mb-8">
                <ImportBillDateFilter
                    onSearch={(start, end) => onDateFilter(start, end)}
                />
            </div>
            <div>
                <DataTable
                    data={data || []}
                    isLoading={isLoading}
                    pick={{
                        username: { title: "Staff" },
                        timestamp: {
                            title: "Created date",
                            mapper: FORMATTER.toShortDate,
                        },
                        importProducts: {
                            title: "Products",
                            mapper: (value: number) => `${value} products`,
                        },
                    }}
                />
            </div>
        </>
    );
};

type ImportBillResponse = {
    id: string;
    timestamp: number;
    username: string;
    supplierId: string;
    importProducts: number;
};

export default Page;
