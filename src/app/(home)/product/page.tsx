"use client";
import { HiPlus } from "react-icons/hi";

import { useDeleteProductMutation } from "@/api/product/deleteProduct.api";
import viewProductList from "@/api/product/viewProductList.api";
import Button from "@/components/Button/Button";
import CheckboxTable from "@/components/CheckboxTable/CheckboxTable";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateProductModal } from "@/components/CreateProductForm/CreateProductFormModal";
import CategoryFilter from "@/components/Filter/CategoryFilter";
import PriceRangeFilter from "@/components/Filter/PriceRangeFilter";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useUpdateProductModal } from "@/components/UpdateProductForm/UpdateProductFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import ProductPreview from "@/types/entity/ProductPreview";
import FORMATTER from "@/utils/formatter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import { withoutQuery } from "@/utils/withQuery";

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";
    const productKeyword = searchParams.get(SEARCH_PARAMS.productName) || "";

    const { openCreateProductModal } = useCreateProductModal();
    const { openUpdateProductModal } = useUpdateProductModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<ProductPreview[]>(
        ["products", productKeyword, category],
        viewProductList,
    );

    const deleteProductMutation = useDeleteProductMutation(refetch);

    return (
        <div className="w-full">
            <div className=" w-full grid grid-cols-2">
                <ProductSearch className="" />
                <div className=" flex justify-end gap-8">
                    <CategoryFilter className="" />
                    <PriceRangeFilter />
                    <Button
                        size="sm"
                        onClick={() => openCreateProductModal(refetch)}
                    >
                        <HiPlus className=" w-4 h-4 mr-2" />
                        Add product
                    </Button>
                </div>
            </div>
            <div className=" flex gap-5 mt-10">
                <FilterBadge
                    title="Product name"
                    content={searchParams.get(SEARCH_PARAMS.productName) || ""}
                    type="search"
                    onClose={() =>
                        router.push(
                            withoutQuery(
                                pathname,
                                [SEARCH_PARAMS.productName],
                                searchParams,
                            ),
                        )
                    }
                />
                <FilterBadge
                    title="Category"
                    content={searchParams.get(SEARCH_PARAMS.categoryName) || ""}
                    type="filter"
                    onClose={() =>
                        router.push(
                            withoutQuery(
                                pathname,
                                [SEARCH_PARAMS.categoryName],
                                searchParams,
                            ),
                        )
                    }
                />
            </div>
            <p className=" mt-8 mb-4 font-semibold text-yellow-500">
                {data && !isLoading ? `${data.length} items` : "Loading..."}
            </p>
            <CheckboxTable
                data={data || []}
                onDelete={(product) => {
                    openClaimModal(
                        <>
                            Do you want to delete product{" "}
                            <span>{product.name}</span>
                        </>,
                        (confirm) =>
                            confirm && deleteProductMutation.mutate(product),
                    );
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
        </div>
    );
}
