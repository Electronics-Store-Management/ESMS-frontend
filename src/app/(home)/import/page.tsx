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

const Page = () => {
    const [supplier, setSupplier] = useState<string>("Giang");
    const [selectedProducts, setSelectedProducts] = useState<ImportProduct[]>(
        [],
    );
    const [tempProductIds, setTempProductIds] = useState<string[]>([]);

    // TODO: get supplier list
    // const { data: suppliers } = useQuery<Supplier[]>(
    //     ["suppliers"],
    //     viewSupplierList,
    //     {
    //         retry: false,
    //     },
    // );

    const {
        data: products,
        isLoading,
        error,
    } = useQuery<ProductPreview[]>(["products"], viewProductList, {
        retry: false,
    });

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

    console.log(tempProductIds);

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="">
                <p className="font-semibold text-color-heading text-2xl">
                    Supplier info
                </p>

                <Select
                    onChange={(e) => {
                        onSelectSupplier(e.target.value);
                    }}
                    required
                >
                    <option value={"Giang"}>Giang</option>
                    <option value={"Hy"}>Hy</option>
                    <option value={"Huyen"}>Huyen</option>
                </Select>

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
                <p className="font-semibold text-color-heading text-2xl">
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
            <div className="col-span-2">
                <p className="font-semibold text-color-heading text-2xl">
                    Product List
                </p>
                <div>
                    <Select
                        multiple
                        onChange={(e) =>
                            setTempProductIds((pre) => [...pre, e.target.value])
                        }
                    >
                        {products?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default Page;

