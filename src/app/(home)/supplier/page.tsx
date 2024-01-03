"use client";

import { HiOutlineSearch, HiPlus } from "react-icons/hi";

import { useDeleteProductMutation } from "@/api/product/deleteProduct.api";
import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import Button from "@/components/Button/Button";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateProductModal } from "@/components/CreateProductForm/CreateProductFormModal";
import DataTable from "@/components/DataTable/DataTable";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import TextInput from "@/components/Input/TextInput";
import { useUpdateProductModal } from "@/components/UpdateProductForm/UpdateProductFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import Supplier from "@/types/entity/Supplier";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { useRef } from "react";
import withQuery from "@/utils/withQuery";
import { useCreateSupplierModal } from "@/components/CreateSupplierForm/CreateSupplierFormModal";
import { useUpdateSupplierModal } from "@/components/UpdateSupplierForm/UpdateSupplierFormModal";
import { useDeleteSupplierMutation } from "@/api/supplier/deleteSupplier.api";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

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
            <DataTable
                data={data || []}
                isLoading={isLoading}
                className="-mr-8 pr-8 mt-4"
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
                pick={{
                    name: { title: "Name" },
                    phone: { title: "Phone" },
                    email: { title: "Email" },
                    address: { title: "Address" },
                }}
            />
        </div>
    );
}
