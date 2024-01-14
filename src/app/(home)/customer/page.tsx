"use client";

import { HiOutlineSearch, HiPlus } from "react-icons/hi";

import { useDeleteCustomerMutation } from "@/api/customer/deleteCustomer.api";
import viewCustomerList from "@/api/customer/viewCustomerList.api";
import Button from "@/components/Button/Button";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateCustomerModal } from "@/components/CreateCustomerForm/CreateCustomerFormModal";
import DataTable from "@/components/DataTable/DataTable";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import TextInput from "@/components/Input/TextInput";
import { useUpdateCustomerModal } from "@/components/UpdateCustomerForm/UpdateCustomerFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import Customer from "@/types/entity/Customer";
import withQuery from "@/utils/withQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useQuery } from "react-query";
import { usePermission } from "@/hooks/usePermission";
import useScreen from "@/hooks/useScreen";
import MobileHeader from "@/components/MobileHeader/MobileHeader";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchRef = useRef<HTMLInputElement>(null);
    const customerKeyword = searchParams.get(SEARCH_PARAMS.supplierName) || "";

    const { open: openCreateCustomerModal } = useCreateCustomerModal();
    const { open: openUpdateCustomerModal } = useUpdateCustomerModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<Customer[]>(
        ["customers", customerKeyword],
        viewCustomerList,
        {
            retry: false,
        },
    );

    const deleteCustomerMutation = useDeleteCustomerMutation(refetch);

    const isAllowedCreate = usePermission("CUSTOMER", ["CREATE"]);

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <div className="w-full h-full flex flex-col">
            <MobileHeader title="Customer" />
            <div className=" w-full flex gap-5">
                <TextInput
                    ref={searchRef}
                    className=" w-96"
                    defaultValue={
                        searchParams.get(SEARCH_PARAMS.customerName) || ""
                    }
                    rightAddon={<HiOutlineSearch />}
                    onRightAddonClick={() =>
                        router.push(
                            withQuery("/customer", {
                                [SEARCH_PARAMS.customerName]:
                                    searchRef?.current?.value,
                            }),
                        )
                    }
                    placeholder="Search customer by name here..."
                />
                <div className=" flex-none flex justify-end place-items-stretch col-span-2 sm:col-span-3 lg:col-span-3 col-start-12 sm:col-start-10 lg:col-start-10 row-start-1 ">
                    {isAllowedCreate ? (
                        <Button
                            size="sm"
                            onClick={() => openCreateCustomerModal(refetch)}
                            className=" place-items-stretch col-span-1 sm:col-span-2 col-start-6 sm:col-start-5 row-start-1 "
                        >
                            <div className="flex items-center gap-2">
                                <HiPlus className=" w-4 h-4" />
                                {!isMobile ? <p>New customer</p> : null}
                            </div>
                        </Button>
                    ) : null}
                </div>
            </div>
            <div className=" flex gap-5 mt-5">
                <FilterBadge
                    title="Product name"
                    type="search"
                    searchParamName={SEARCH_PARAMS.customerName}
                />
            </div>
            <div className=" w-full h-full overflow-auto flex gap-5">
                <DataTable
                    data={data || []}
                    entityType="CUSTOMER"
                    isLoading={isLoading}
                    className=""
                    onDelete={(customer) => {
                        openClaimModal(
                            <>
                                Do you want to delete customer{" "}
                                <span>{customer.name}</span>
                            </>,
                            (confirm) =>
                                confirm &&
                                deleteCustomerMutation.mutate(customer),
                        );
                    }}
                    onEdit={(customer) => {
                        openUpdateCustomerModal(customer.id, refetch);
                    }}
                    pick={{
                        name: { title: "Name" },
                        phone: { title: "Phone" },
                        address: { title: "Address" },
                    }}
                />
            </div>
        </div>
    );
}
