"use client";

import { useDeleteSupplierMutation } from "@/api/supplier/deleteSupplier.api";
import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import DataTable from "@/components/DataTable/DataTable";
import { useUpdateSupplierModal } from "@/components/UpdateSupplierForm/UpdateSupplierFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import Supplier from "@/types/entity/Supplier";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

export default function SupplierList() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const supplierKeyword = searchParams.get(SEARCH_PARAMS.supplierName) || "";

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
                        confirm && deleteSupplierMutation.mutate(supplier),
                );
            }}
            onEdit={(supplier) => {
                openUpdateSupplierModal(supplier.id, refetch);
            }}
            onClickRow={(supplier) => router.push(`/supplier/${supplier.id}`)}
            pick={{
                name: {
                    title: "Name",
                    className: " font-normal min-w-[150px]",
                },
                email: { title: "Email" },
                ...(pathname.split("/").at(-1) != "supplier"
                    ? {}
                    : {
                          phone: { title: "Phone" },
                          address: { title: "Address" },
                      }),
            }}
        />
    );
}
