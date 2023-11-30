"use client";
import { HiPlus } from "react-icons/hi";

import deleteProductAPI from "@/api/product/deleteProduct.api";
import viewProductList from "@/api/product/viewProductList.api";
import Button from "@/components/Button/Button";
import CheckboxTable from "@/components/CheckboxTable/CheckboxTable";
import CategoryFilter from "@/components/Filter/CategoryFilter";
import PriceRangeFilter from "@/components/Filter/PriceRangeFilter";
import ClaimModal from "@/components/ClaimModal/ClaimModal";
import { useNotifyModal } from "@/components/NotifyModal/NotifyModal";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import SEARCH_PARAMS from "@/constants/searchParams";
import OperationState from "@/types/OperationState";
import ProductPreview from "@/types/entity/ProductPreview";
import FORMATTER from "@/utils/formatter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useCreateProductModal } from "@/components/CreateProductForm/CreateProductFormModal";
import toast from "react-hot-toast";
import { DeleteProductToast } from "@/components/ToastMessage/DeleteProductToast";
import useLoading from "@/hooks/useLoading";
import { useUpdateProductModal } from "@/components/UpdateProductForm/UpdateProductFormModal";

export default function Page() {
    const searchParams = useSearchParams();

    const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";
    const productKeyword = searchParams.get(SEARCH_PARAMS.productName) || "";

    const { openCreateProductModal } = useCreateProductModal();

    const { openLoading, closeLoading } = useLoading();

    const { isOpenModal, setOpenModal } = useNotifyModal();
    const { openUpdateProductModal } = useUpdateProductModal();
    const [deletedProduct, setDeletedProduct] = useState<ProductPreview>();

    const { data, isLoading, refetch } = useQuery<ProductPreview[]>(
        ["products", productKeyword, category],
        viewProductList,
    );

    const deleteMutation = useMutation(deleteProductAPI, {
        onSuccess: (res, data) => {
            refetch();
            closeLoading();
            toast.custom(
                (t) => (
                    <DeleteProductToast
                        productName={data?.name || ""}
                        isSuccess
                        t={t}
                    />
                ),
                { duration: 3000 },
            );
        },
        onError: (error, data) => {
            closeLoading();
            toast.custom(
                (t) => (
                    <DeleteProductToast
                        productName={data?.name || ""}
                        isSuccess={false}
                        t={t}
                        retry={() => deleteProduct(deletedProduct)}
                    />
                ),
                { duration: 3000 },
            );
        },
    });

    function deleteProduct(product?: ProductPreview) {
        openLoading("Loading...");
        deleteMutation.mutate(product);
    }

    return (
        <div className="w-full">
            <div className=" w-full grid grid-cols-2">
                <ProductSearch className="" />
                <div className=" flex justify-end gap-8">
                    <CategoryFilter className="" />
                    <PriceRangeFilter />
                    <Button size="sm" onClick={() => openCreateProductModal()}>
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
                onEdit={(product) => {
                    openUpdateProductModal(product.id, refetch);
                }}
                pick={{
                    name: { title: "Name" },
                    category: { title: "Category" },
                    price: {
                        title: "Price",
                        className: " font-normal text-secondary-500",
                        mapper: FORMATTER.toCurrency,
                    },
                    quantity: {
                        title: "Quantity",
                        mapper: (value: number) => value || "0",
                    },
                    modifiedDate: {
                        title: "Last update",
                        className: " font-normal text-secondary-500",
                        mapper: FORMATTER.toShortDate,
                    },
                    warrantyPeriod: {
                        title: "Warranty period",
                        mapper: (value: number) => `${value} months`,
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
                    isDelete && deleteProduct(deletedProduct)
                }
            />
        </div>
    );
}
