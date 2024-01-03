"use client";

import { HiOutlineSearch, HiPlus } from "react-icons/hi";

import { useDeleteSupplierMutation } from "@/api/supplier/deleteSupplier.api";
import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import Button from "@/components/Button/Button";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateSupplierModal } from "@/components/CreateSupplierForm/CreateSupplierFormModal";
import DataTable from "@/components/DataTable/DataTable";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import TextInput from "@/components/Input/TextInput";
import { useUpdateSupplierModal } from "@/components/UpdateSupplierForm/UpdateSupplierFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import Supplier from "@/types/entity/Supplier";
import withQuery from "@/utils/withQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useQuery } from "react-query";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import useClient from "@/hooks/useClient";

export default function Layout({ children }: ReactNodeChildren) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const isClient = useClient();

    const searchRef = useRef<HTMLInputElement>(null);
    const supplierKeyword = searchParams.get(SEARCH_PARAMS.supplierName) || "";

    const { open: openCreateSupplierModal } = useCreateSupplierModal();
    const { open: openUpdateSupplierModal } = useUpdateSupplierModal();

    const { data, isLoading, refetch } = useQuery<Supplier[]>(
        ["suppliers", supplierKeyword],
        viewSupplierList,
        {
            retry: false,
        },
    );

    const deleteSupplierMutation = useDeleteSupplierMutation(refetch);
    const { openClaimModal } = useClaimModal();

    return (
        <div className="w-full h-full flex flex-col">
            <div className=" w-full grid grid-cols-2">
                <TextInput
                    ref={searchRef}
                    className=" w-96"
                    defaultValue={
                        searchParams.get(SEARCH_PARAMS.supplierName) || ""
                    }
                    rightAddon={<HiOutlineSearch />}
                    onRightAddonClick={() =>
                        router.push(
                            withQuery("/supplier", {
                                [SEARCH_PARAMS.supplierName]:
                                    searchRef?.current?.value,
                            }),
                        )
                    }
                    placeholder="Search supplier by name here..."
                />
                <div className=" flex justify-end gap-8">
                    <Button
                        size="sm"
                        onClick={() => openCreateSupplierModal(refetch)}
                    >
                        <HiPlus className=" w-4 h-4 mr-2" />
                        Add supplier
                    </Button>
                </div>
            </div>
            <div className=" flex gap-5 mt-5">
                <FilterBadge
                    title="Supplier name"
                    type="search"
                    searchParamName={SEARCH_PARAMS.supplierName}
                />
            </div>
            <div className=" w-full flex-1 overflow-auto flex gap-5">
                {isClient && (
                    <DataTable
                        data={data || []}
                        isLoading={isLoading}
                        onDelete={(supplier) => {
                            openClaimModal(
                                <>
                                    Do you want to delete supplier{" "}
                                    <span>{supplier.name}</span>
                                </>,
                                (confirm) =>
                                    confirm &&
                                    deleteSupplierMutation.mutate(supplier),
                            );
                        }}
                        onEdit={(supplier) => {
                            openUpdateSupplierModal(supplier.id, refetch);
                        }}
                        onClickRow={(supplier) =>
                            router.push(`/supplier/${supplier.id}`)
                        }
                        pick={{
                            name: { title: "Name" },
                            email: { title: "Email" },
                            ...(pathname.split("/").at(-1) != "supplier"
                                ? {}
                                : {
                                      phone: { title: "Phone" },
                                      address: { title: "Address" },
                                  }),
                        }}
                    />
                )}

                {children}
            </div>
        </div>
    );
}
