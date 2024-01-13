"use client";

import { HiPlus } from "react-icons/hi";

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
import { usePermission } from "@/hooks/usePermission";
import ProductPreview from "@/types/entity/ProductPreview";
import FORMATTER from "@/utils/formatter";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import useScreen from "@/hooks/useScreen";
import MenuButton from "@/components/SideBar/MenuButton";
import FONT from "@/utils/fontFamily";

const font = FONT.primary;

export default function Page() {
    const screen = useScreen();
    const isMobile = !screen("md");

    const searchParams = useSearchParams();

    const category = searchParams.get(SEARCH_PARAMS.categoryName) || "";
    const productKeyword = searchParams.get(SEARCH_PARAMS.productName) || "";
    const price = searchParams.get(SEARCH_PARAMS.price) || "";

    const { openCreateProductModal } = useCreateProductModal();
    const { openUpdateProductModal } = useUpdateProductModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<ProductPreview[]>(
        ["products", productKeyword, category, price],
        viewProductList,
        {
            retry: false,
        },
    );

    const deleteProductMutation = useDeleteProductMutation(refetch);

    const isAllowedCreate = usePermission("PRODUCT", ["CREATE"]);

    return (
        <div className="w-full h-full flex flex-col">
            {screen("xl") ? (
                <div className=" w-full grid xl:grid-cols-2">
                    <ProductSearch className="" />
                    <div className=" flex justify-end gap-8">
                        <CategoryFilter className="" />
                        <PriceRangeFilter />
                        {isAllowedCreate ? (
                            <Button
                                size="sm"
                                onClick={() => openCreateProductModal(refetch)}
                            >
                                <HiPlus className=" w-4 h-4 mr-2" />
                                Add product
                            </Button>
                        ) : null}
                    </div>
                </div>
            ) : screen("sm") ? (
                <div className=" w-full flex flex-col gap-5">
                    <div className=" flex justify-between">
                        <ProductSearch className="" />
                        {isAllowedCreate ? (
                            <Button
                                size="sm"
                                onClick={() => openCreateProductModal(refetch)}
                            >
                                <HiPlus className=" w-4 h-4 mr-2" />
                                Add product
                            </Button>
                        ) : null}
                    </div>
                    <div className=" flex justify-start gap-5">
                        <CategoryFilter className="" />
                        <PriceRangeFilter />
                    </div>
                </div>
            ) : (
                <div className=" w-full flex flex-col gap-5">
                    <div className="mb-1 flex justify-between">
                        <h1 className={` text-3xl font-semibold`}>
                            Product list
                        </h1>
                        <MenuButton />
                    </div>
                    <ProductSearch className=" w-full" />
                    <div className=" grid grid-cols-3 gap-8 items-end">
                        <div className=" col-span-2 ml-auto grid items-end gap-3">
                            <CategoryFilter className="" />
                            <PriceRangeFilter />
                        </div>
                        {isAllowedCreate ? (
                            <div className=" ml-auto">
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        openCreateProductModal(refetch)
                                    }
                                >
                                    <HiPlus className=" w-4 h-4 mr-2" />
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
            <div className=" flex flex-wrap gap-5 mt-5">
                <FilterBadge
                    title="Product name"
                    type="search"
                    searchParamName={SEARCH_PARAMS.productName}
                />
                <FilterBadge
                    title="Category"
                    searchParamName={SEARCH_PARAMS.categoryName}
                    type="filter"
                />
                <FilterBadge
                    title="Price"
                    searchParamName={SEARCH_PARAMS.price}
                    type="filter"
                />
            </div>
            <DataTable
                data={data || []}
                isLoading={isLoading}
                className="-mr-8 pr-8 mt-4"
                entityType={"PRODUCT"}
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
                    name: {
                        title: "Name",
                        className: " font-normal min-w-[250px]",
                    },
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
                    warrantyPeriod: {
                        title: "Warranty period",
                        mapper: (value: number) => `${value} months`,
                    },
                }}
            />
        </div>
    );
}
