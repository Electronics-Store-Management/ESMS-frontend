"use client";

import viewImportList from "@/api/import/viewImportList.api";
import DataTable from "@/components/DataTable/DataTable";
import ImportBillDateFilter from "@/components/ImportBillDateFilter/ImportBillDateFilter";
import SEARCH_PARAMS from "@/constants/searchParams";
import Revision from "@/types/Revision";
import ImportBill, { ImportProductResponse } from "@/types/entity/ImportBill";
import FORMATTER from "@/utils/formatter";
import withQuery from "@/utils/withQuery";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";

const Page = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const onDateFilter = (start: Date, end: Date) => {
        router.replace(
            withQuery(
                "/import_bill",
                {
                    [SEARCH_PARAMS.startDate]: start.getTime(),
                    [SEARCH_PARAMS.endDate]: end.getTime(),
                },
                searchParams,
            ),
        );
    };

    const startDateStr = searchParams.get(SEARCH_PARAMS.startDate);
    const startDate = startDateStr ? new Date(parseInt(startDateStr)) : null;

    const endDateStr = searchParams.get(SEARCH_PARAMS.endDate);
    const endDate = endDateStr ? new Date(parseInt(endDateStr)) : null;

    const {
        data: preData,
        isLoading,
        refetch,
    } = useQuery<Revision<ImportBill<ImportProductResponse>>[]>(
        ["import", startDate?.getTime(), endDate?.getTime()],
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
                    isEdit={false}
                    pick={{
                        timestamp: {
                            title: "Created date",
                            mapper: FORMATTER.toShortDate,
                        },
                        username: { title: "Staff" },
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
