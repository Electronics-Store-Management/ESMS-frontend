"use client";
import { HiPlus } from "react-icons/hi";

import {
    useDeleteStaffMutation,
} from "@/api/staff/deleteStaff.api";
import viewStaffList from "@/api/staff/viewStaffList.api";
import Button from "@/components/Button/Button";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateStaffModal } from "@/components/CreateStaffForm/CreateStaffFormModal";
import DataTable from "@/components/DataTable/DataTable";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import { useUpdateStaffModal } from "@/components/UpdateStaffForm/UpdateStaffFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import Staff from "@/types/entity/Staff";
import FORMATTER from "@/utils/formatter";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

export default function Page() {
    const searchParams = useSearchParams();

    const { openCreateStaffModal } = useCreateStaffModal();
    const { openUpdateStaffModal } = useUpdateStaffModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<Staff[]>(
        ["staffs", ""],
        viewStaffList,
        {
            retry: false,
        },
    );

    const deleteStaffMutation = useDeleteStaffMutation(refetch);

    return (
        <div className="w-full">
            <div className=" w-full grid grid-cols-2">
                {/* <ProductSearch className="" /> */}
                <h1 className=" font-semibold text-2xl">Staff management</h1>
                <div className=" flex justify-end gap-8">
                    <Button
                        size="sm"
                        onClick={() => openCreateStaffModal(refetch)}
                    >
                        <HiPlus className=" w-4 h-4 mr-2" />
                        Add new staff
                    </Button>
                </div>
            </div>
            <div className=" flex gap-5 mt-10">
                <FilterBadge
                    title="Product name"
                    type="search"
                    searchParamName={SEARCH_PARAMS.staffName}
                />
            </div>
            <p className=" mt-8 mb-4 font-semibold text-yellow-500">
                {data && !isLoading ? `${data.length} items` : "Loading..."}
            </p>
            <DataTable
                data={data || []}
                isLoading={isLoading}
                onDelete={(staff) => {
                    openClaimModal(
                        <>
                            Do you want to delete staff <b>{staff.name}</b>
                        </>,
                        (confirm) =>
                            confirm && deleteStaffMutation.mutate(staff),
                    );
                }}
                onEdit={(staff) => {
                    openUpdateStaffModal(staff.id, refetch);
                }}
                pick={{
                    name: { title: "Name" },
                    email: {
                        title: "Email",
                        className: " font-normal text-secondary-500",
                    },
                    phone: {
                        title: "Phone number",
                        className: " font-normal text-secondary-500",
                    },
                    citizenId: {
                        title: "Citizen ID",
                        className: " font-normal text-secondary-500",
                    },
                    lastOnline: {
                        title: "Last online",
                        className: " font-normal text-secondary-500",
                        mapper: FORMATTER.toShortDate,
                    },
                }}
            />
        </div>
    );
}
