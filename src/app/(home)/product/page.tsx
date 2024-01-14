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
            <div className=" w-full grid grid-cols-[repeat(12,1fr)] grid-rows-3 sm:grid-rows-2 gap-5 place-items-stretch">
                <ProductSearch className=" col-span-12 row-span-1 md:col-span-6 lg:col-span-6" />
                <div className=" col-span-11 xl:col-span-4 sm:col-start-1 xl:col-start-7 row-start-2 sm:row-start-2 xl:row-start-1 row-span-2 sm:row-span-1 xl:row-span-1 flex flex-col flex-wrap sm:flex-row gap-5">
                    <CategoryFilter className="" />
                    <PriceRangeFilter className="" />
                </div>
                {isAllowedCreate ? (
                    <Button
                        size="sm"
                        onClick={() => openCreateProductModal(refetch)}
                        className=" place-items-stretch col-span-1 md:col-span-3 sm:col-span-3 col-start-12 md:col-start-10 sm:col-start-10 row-start-3 sm:row-start-2 md:row-start-1 lg:col-start-11"
                    >
                        <div className="flex gap-2 items-center">
                            <HiPlus className=" w-4 h-4" />
                            {screen("sm") ? "Add product" : null}
                        </div>
                    </Button>
                ) : null}
            </div>
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
