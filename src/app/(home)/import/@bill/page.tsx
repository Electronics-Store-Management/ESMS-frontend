"use client";

import viewProductList from "@/api/product/viewProductList.api";
import BillProductTable from "@/components/BillProductTable/BillProductTable";
import Button from "@/components/Button/Button";
import ControllerSelectInput from "@/components/ControllerInput/ControllerSelectInput";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import ImportBill, { ImportProduct } from "@/types/entity/ImportBill";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiCheck } from "react-icons/hi";

const Page = () => {
    const [billProducts, setBillProducts] = useState<
        Map<string, ImportProduct>
    >(new Map<string, ImportProduct>());

    function getTotalInfo() {
        let quantity = 0;
        let price = 0;
        billProducts.forEach((product) => {
            quantity += product.quantity * 1;
            price += product.price * product.quantity;
        });

        return { quantity, price };
    }
    const {
        control: billControll,
        getValues,
        setValue,
    } = useForm<ImportBill>();

    // const onSelectSupplier = (supplier: string) => {
    //     setSupplier(supplier);
    // };

    // const onSelectProducts = (
    //     productId: string,
    //     quantity: number,
    //     price: number,
    // ) => {
    //     const convertedProduct = {
    //         productId: productId,
    //         quantity: quantity,
    //         price: price,
    //         paymentMethod: "",
    //         importProducts: [],
    //     };
    // };

    function getRequest() {
        const importProducts = Array.from(billProducts.values()).map(
            (product) => ({
                ...product,
                productId: product.id,
            }),
        );

        const request: Omit<ImportBill, "id"> = {
            paymentMethod: getValues("paymentMethod"),
            importProducts: { ...importProducts },
        };
        return request;
    }

    return (
        <div className=" h-full col-span-2 flex flex-col overflow-y-auto pl-2">
            <p className=" font-semibold text-color-heading text-2xl">
                Product List
            </p>
            <SearchInput
                title="Search for product to add to import bill"
                placeholder="Enter product name here..."
                queryInfo={{
                    queryKeys: ["products"],
                    queryFunc: viewProductList,
                }}
                onSelect={(product) => {
                    billProducts.set(product.id, {
                        ...product,
                        productId: product.id,
                    });
                    setBillProducts(new Map(billProducts.entries()));
                }}
                className=" w-1/2 mt-5"
            />
            <BillProductTable
                className="mt-8 flex-1"
                data={billProducts}
                onChange={(id, product) => {
                    billProducts.set(id, product);
                    setBillProducts(new Map(billProducts.entries()));
                }}
                onRemove={(id: string) => {
                    billProducts.delete(id);
                    setBillProducts(new Map(billProducts.entries()));
                }}
                fields={{
                    name: {
                        title: "Product name",
                        size: 3,
                        editable: false,
                    },
                    price: { title: "Price", size: 2, type: "number" },
                    quantity: {
                        title: "Quantity",
                        defaultValue: 1,
                        type: "number",
                        size: 2,
                        validateFunc: (value: number) => {
                            if (value <= 0)
                                return "You must import at least 1 product";
                            return "";
                        },
                    },
                    totalPrice: {
                        title: "Total price",
                        size: 2,
                        calculateFunc: ({ price, quantity }) =>
                            price * quantity,
                    },
                }}
            />
            <div className=" mt-4 flex-none flex items-end w-full">
                <div className="flex-1 flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                        <p>
                            Total items:{"  "}
                            <span className=" text-lg font-semibold text-secondary-950">
                                {getTotalInfo().quantity}
                            </span>
                        </p>
                        <p>
                            Total price:{"  "}
                            <span className=" text-lg font-semibold text-primary-500">
                                {getTotalInfo().price}
                            </span>
                            {"  "}đ
                        </p>
                    </div>
                    <ControllerSelectInput
                        className="mt-4 w-1/2"
                        control={billControll}
                        name="payment"
                        title="Payment"
                        items={PAYMENT_METHOD}
                        onValueChange={(value) =>
                            value && setValue("paymentMethod", value)
                        }
                    />
                </div>
                <div className=" flex gap-5">
                    <Button btnType="secondary">Cancel</Button>
                    <Button className=" flex">
                        <HiCheck size={20} />
                        <p className=" ml-1">Submit</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const PAYMENT_METHOD = [
    { name: "Cash", id: "Cash" },
    { name: "Momo", id: "Momo" },
    { name: "Paypal", id: "Paypal" },
    { name: "Visa", id: "Visa" },
    { name: "Con cac", id: "Con cac" },
    { name: "Lo dit", id: "Lo dit" },
];

export default Page;
