"use client";

import viewWarrantyBillList from "@/api/warranty/viewWarrantyBillList.api";
import DataTable from "@/components/DataTable/DataTable";
import ImportBillDateFilter from "@/components/ImportBillDateFilter/ImportBillDateFilter";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Revision from "@/types/Revision";
import WarrantyBill, {
    WarrantyProductResponse,
} from "@/types/entity/WarrantyBill";
import FORMATTER from "@/utils/formatter";
import withQuery from "@/utils/withQuery";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "react-query";

const Layout = ({ children }: ReactNodeChildren) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const onDateFilter = (start: Date, end: Date) => {
        router.replace(
            withQuery(
                "/warranty-invoice",
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
    } = useQuery<Revision<WarrantyBill<WarrantyProductResponse>>[]>(
        ["warranties", startDate?.getTime(), endDate?.getTime()],
        viewWarrantyBillList,
        {
            retry: false,
        },
    );

    const data: WarrantyBillResponse[] = useMemo(
        () =>
            preData?.map(
                (value: Revision<WarrantyBill<WarrantyProductResponse>>) => ({
                    ..._.pick(value, ["timestamp", "username"]),
                    id: value.revision.id,
                    customerId: value.revision.customerId || "",
                    warrantyProducts: value.revision.warrantyProducts.length,
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
            <div className=" w-full h-full overflow-auto flex gap-5">
                <DataTable
                    data={data || []}
                    isLoading={isLoading}
                    className="flex-1"
                    isEdit={false}
                    onClickRow={(row: WarrantyBillResponse) => {
                        router.push(
                            withQuery(
                                `/warranty-invoice/${row.id}`,
                                {},
                                searchParams,
                            ),
                        );
                    }}
                    pick={{
                        timestamp: {
                            title: "Created date",
                            mapper: FORMATTER.toShortDate,
                        },
                        username: { title: "Staff" },
                        warrantyProducts: {
                            title: "Products",
                            mapper: (value: number) => `${value} products`,
                        },
                    }}
                />
                {children}
            </div>
        </>
    );
};

export default Layout;

type WarrantyBillResponse = {
    id: string;
    timestamp: number;
    username: string;
    customerId: string;
    warrantyProducts: number;
};
