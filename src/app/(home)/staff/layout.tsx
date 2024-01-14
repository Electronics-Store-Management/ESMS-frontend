"use client";

import { HiPlus } from "react-icons/hi";

import { useDeleteStaffMutation } from "@/api/staff/deleteStaff.api";
import viewStaffList from "@/api/staff/viewStaffList.api";
import Button from "@/components/Button/Button";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateStaffModal } from "@/components/CreateStaffForm/CreateStaffFormModal";
import DataTable from "@/components/DataTable/DataTable";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import { useUpdateStaffModal } from "@/components/UpdateStaffForm/UpdateStaffFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Staff from "@/types/entity/Staff";
import FORMATTER from "@/utils/formatter";
import withQuery from "@/utils/withQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useScreen from "@/hooks/useScreen";
import { useQuery } from "react-query";
import { usePermission } from "@/hooks/usePermission";
import MenuButton from "@/components/SideBar/MenuButton";

export default function Layout({ children }: ReactNodeChildren) {
    const router = useRouter();
    const pathname = usePathname();
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

    const isAllowedCreate = usePermission("STAFF", ["CREATE"]);

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <div className=" p-1 w-full flex flex-col overflow-auto">
            <div className=" w-full flex gap-2">
                <h1 className=" flex-1 font-semibold text-2xl">Store staff</h1>
                <div className=" mr-3 flex-none flex justify-end place-items-stretch col-span-2 sm:col-span-3 lg:col-span-3 col-start-12 sm:col-start-10 lg:col-start-10 row-start-1 ">
                    {isAllowedCreate ? (
                        <Button
                            size="sm"
                            onClick={() => openCreateStaffModal(refetch)}
                            className=" place-items-stretch col-span-1 sm:col-span-2 col-start-6 sm:col-start-5 row-start-1 "
                        >
                            <div className="flex items-center gap-2">
                                <HiPlus className=" w-4 h-4" />
                                {!isMobile ? <p>New staff</p> : null}
                            </div>
                        </Button>
                    ) : null}
                </div>
                <MenuButton />
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
            <div className=" w-full flex flex-col-reverse lg:flex-row gap-5">
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
                    onClickRow={(staff: Staff) => {
                        router.push(
                            withQuery(`/staff/${staff.id}`, {}, searchParams),
                        );
                    }}
                    pick={{
                        name: { title: "Name", className: "min-w-[150px]" },
                        ...(pathname.split("/").at(-1) != "staff"
                            ? {}
                            : {
                                  email: {
                                      title: "Email",
                                      className:
                                          " font-normal text-secondary-500 min-w-[150px]",
                                  },
                                  phone: {
                                      title: "Phone number",
                                      className:
                                          " font-normal text-secondary-500 min-w-[100px]",
                                  },
                                  citizenId: {
                                      title: "Citizen ID",
                                      className:
                                          " font-normal text-secondary-500 min-w-[100px]",
                                  },
                              }),
                        lastOnline: {
                            title: "Last online",
                            className:
                                " font-normal text-secondary-500 min-w-[150px]",
                            mapper: FORMATTER.toShortDate,
                        },
                    }}
                />
                {children}
            </div>
        </div>
    );
}
