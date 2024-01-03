"use client";

import { HiOutlineSearch, HiPlus } from "react-icons/hi";

import { useDeleteProductMutation } from "@/api/product/deleteProduct.api";
import viewProductList from "@/api/product/viewProductList.api";
import Button from "@/components/Button/Button";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateProductModal } from "@/components/CreateProductForm/CreateProductFormModal";
import DataTable from "@/components/DataTable/DataTable";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import PriceRangeFilter from "@/components/PriceRangeFilter/PriceRangeFilter";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useUpdateProductModal } from "@/components/UpdateProductForm/UpdateProductFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import ProductPreview from "@/types/entity/ProductPreview";
import FORMATTER from "@/utils/formatter";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import TextInput from "@/components/Input/TextInput";
import { useRef } from "react";
import withQuery from "@/utils/withQuery";
import Customer from "@/types/entity/Customer";
import viewCustomerList from "@/api/customer/viewCustomerList.api";
import { useCreateCustomerModal } from "@/components/CreateCustomerForm/CreateCustomerFormModal";
import { useUpdateCustomerModal } from "@/components/UpdateCustomerForm/UpdateCustomerFormModal";
import { useDeleteCustomerMutation } from "@/api/customer/deleteCustomer.api";

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

    return (
        <div className="w-full h-full flex flex-col">
            <div className=" w-full grid grid-cols-2">
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
                <div className=" flex justify-end gap-8">
                    <Button
                        size="sm"
                        onClick={() => openCreateCustomerModal(refetch)}
                    >
                        <HiPlus className=" w-4 h-4 mr-2" />
                        Add customer
                    </Button>
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
