"use client";
import { HiPlus } from "react-icons/hi";

import Button from "@/components/Button/Button";
import CategoryFilter from "@/components/Filter/CategoryFilter";
import PriceRangeFilter from "@/components/Filter/PriceRangeFilter";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useSearchParams } from "next/navigation";
import CheckboxTable from "@/components/CheckboxTable/CheckboxTable";
import SEARCH_PARAMS from "@/constants/searchParams";
import { useMutation, useQuery } from "react-query";
import viewProductList from "@/api/product/viewProductList.api";
import ProductPreview from "@/types/entity/ProductPreview";
import { useNotifyModal } from "@/components/NotifyModal/NotifyModal";
import ClaimModal from "@/components/NotifyModal/ClaimModal";
import { useState } from "react";
import deleteProduct from "@/api/product/deleteProduct.api";
import OperationState from "@/types/OperationState";
import OperationStatusModal from "@/components/NotifyModal/OperationStatusModal";

export default function Page() {
    const searchParams = useSearchParams();
    const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";
    const productKeyword = searchParams.get(SEARCH_PARAMS.productName) || "";

    const { isOpenModal, setOpenModal } = useNotifyModal();
    const [deletedProduct, setDeletedProduct] = useState<ProductPreview>();

    const [deleteModalState, setDeleteModalState] =
        useState<OperationState>("none");

    const { data, isLoading, refetch } = useQuery<ProductPreview[]>(
        ["products", productKeyword, category],
        viewProductList,
        {},
    );

    const deleteMutation = useMutation(deleteProduct, {
        onSuccess: () => {
            refetch();
            setDeleteModalState("success");
        },
        onError: () => {
            setDeleteModalState("fail");
        },
    });

    return (
        <div className="w-full">
            <div className=" w-full grid grid-cols-2">
                <ProductSearch className="" />
                <div className=" flex justify-end gap-8">
                    <CategoryFilter className="" />
                    <PriceRangeFilter />
                    <Button size="sm">
                        <HiPlus className=" w-4 h-4 mr-2" />
                        Add product
                    </Button>
                </div>
            </div>
            <p className=" mt-8 mb-4 font-semibold text-yellow-500">
                {data ? `${data.length} items` : "Loading..."}
            </p>
            <CheckboxTable
                data={data || []}
                onDelete={(product) => {
                    setOpenModal(true);
                    setDeletedProduct(product);
                }}
                pick={{
                    name: { title: "Name" },
                    category: { title: "Category" },
                    price: {
                        title: "Price",
                        className: " font-normal text-secondary-500",
                        mapper: (value: number) =>
                            new Intl.NumberFormat("vn-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(value),
                    },
                    quantity: {
                        title: "Quantity",
                        mapper: (value: number) => value || "0",
                    },
                    modifiedDate: {
                        title: "Last update",
                        className: " font-normal text-secondary-500",
                        mapper: (value: string) =>
                            new Intl.DateTimeFormat("en-GB", {
                                dateStyle: "medium",
                                timeStyle: "short",
                                timeZone: "Asia/Ho_Chi_Minh",
                            }).format(new Date(value)),
                    },
                }}
            />
            <ClaimModal
                itemName={
                    <span>
                        product <b>{deletedProduct?.name}</b>
                    </span>
                }
                openModal={isOpenModal}
                setOpenModal={setOpenModal}
                onResponse={(isDelete) =>
                    isDelete && deleteMutation.mutate(deletedProduct?.id || "")
                }
            />
            <OperationStatusModal
                state={deleteModalState}
                success={
                    <span>
                        Delete product{" "}
                        <b>{deletedProduct?.name} successfully</b>
                    </span>
                }
                fail={
                    <span>
                        Fail to delete product <b>{deletedProduct?.name}</b>
                    </span>
                }
                onCloseModal={() => setDeleteModalState("none")}
            />
        </div>
    );
}
