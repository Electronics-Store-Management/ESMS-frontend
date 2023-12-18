"use client";

import TextInput from "@/components/Input/TextInput";
import StaffTouch from "@/types/entity/StaffTouch";
import { Select } from "flowbite-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
    HiUser,
    HiPhone,
    HiMail,
    HiLocationMarker,
    HiHome,
} from "react-icons/hi";
import ProductPreview from "@/types/entity/ProductPreview";
import viewProductList from "@/api/product/viewProductList.api";
import Product from "@/types/entity/Product";
import ImportProduct from "@/types/entity/ImportBill";
import Supplier from "@/types/entity/Supplier";
import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import ControllerSelectInput from "@/components/ControllerInput/ControllerSelectInput";
import { useForm } from "react-hook-form";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useSearchParams } from "next/navigation";
import SEARCH_PARAMS from "@/constants/searchParams";
import DataTable from "@/components/DataTable/DataTable";
import FORMATTER from "@/utils/formatter";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";

const Page = () => {
    const searchParams = useSearchParams();

    const [supplier, setSupplier] = useState<string>("Giang");
    const [selectedProducts, setSelectedProducts] = useState<ImportProduct[]>(
        [],
    );

    const [tempProductIds, setTempProductIds] = useState<string[]>([]);

    // TODO: get supplier list
    const { data: suppliers, isLoading: isSupplierLoading } = useQuery<
        Supplier[]
    >(["suppliers"], viewSupplierList, {
        retry: false,
    });

    const { data: products, isLoading: isProductLoading } = useQuery<
        ProductPreview[]
    >(
        ["products", searchParams.get(SEARCH_PARAMS.productName)],
        viewProductList,
        {
            retry: false,
        },
    );

    const { control } = useForm<Supplier>();
    const { control: productControl } = useForm<Product>();

    const onSelectSupplier = (supplier: string) => {
        setSupplier(supplier);
    };

    const onSelectProducts = (
        productId: string,
        quantity: number,
        price: number,
    ) => {
        const convertedProduct = {
            productId: productId,
            quantity: quantity,
            price: price,
            paymentMethod: "",
            importProducts: [],
        };
        setSelectedProducts((pre) => [
            ...pre,
            convertedProduct as unknown as ImportProduct,
        ]);
    };

    const { openClaimModal } = useClaimModal();

    console.log(tempProductIds);

    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="">
                <p className="font-semibold text-color-heading text-2xl">
                    Supplier info
                </p>

                <ControllerSelectInput
                    control={control}
                    name="supplier"
                    title="Supplier"
                    isLoading={isSupplierLoading}
                    items={suppliers}
                />

                <br />
                <TextInput
                    title="Name"
                    icon={HiUser}
                    value={supplier}
                    readOnly
                />
                <TextInput
                    title="Email"
                    icon={HiMail}
                    value={supplier}
                    readOnly
                />
                <TextInput
                    title="Phone number"
                    icon={HiPhone}
                    value={supplier}
                    readOnly
                />
                <TextInput
                    title="Address"
                    icon={HiLocationMarker}
                    value={supplier}
                    readOnly
                />
                <br />
                <p className="mt-10 font-semibold text-color-heading text-2xl">
                    Store info
                </p>

                <TextInput icon={HiHome} value="ESMS" readOnly />

                <TextInput
                    title="Staff"
                    icon={HiUser}
                    value={supplier}
                    readOnly
                />
            </div>
            <div className="col-span-2 overflow-y-auto">
                <div className=" flex gap-5 items-center">
                    <ProductSearch className=" " />
                    <FilterBadge
                        title="Product name"
                        type="search"
                        searchParamName={SEARCH_PARAMS.productName}
                    />
                </div>
                <DataTable
                    className="mt-5"
                    data={products || []}
                    isLoading={isProductLoading}
                    isEdit={false}
                    onClickRow={(product: ProductPreview) =>
                        openClaimModal(
                            <>
                                Do you want to add product{" "}
                                <span>{product.name}</span>
                            </>,
                            (confirm) =>
                                confirm &&
                                setSelectedProducts((prev) => [
                                    ...prev,
                                    {
                                        ...product,
                                        productId: product.id,
                                        quantity: 0,
                                        price: product.price,
                                    } as ImportProduct,
                                ]),
                        )
                    }
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
                    }}
                />
                <p className=" mt-9 font-semibold text-color-heading text-2xl">
                    Product List
                </p>
                <DataTable
                    className="mt-5"
                    data={selectedProducts || []}
                    isLoading={isProductLoading}
                    isEdit={false}
                    pick={{
                        name: { title: "Name" },
                        category: { title: "Category" },
                        price: {
                            title: "Price",
                            className: " font-normal text-secondary-500",
                            mapper: FORMATTER.toCurrency,
                            editable: true,
                        },
                        quantity: {
                            title: "Quantity",
                            mapper: (value: number) => value || "0",
                            editable: true,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Page;
