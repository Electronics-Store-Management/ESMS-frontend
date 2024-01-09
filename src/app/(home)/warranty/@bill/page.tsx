"use client";

import viewProductList from "@/api/product/viewProductList.api";
import BillProductTable from "@/components/BillProductTable/BillProductTable";
import Button from "@/components/Button/Button";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { HiCheck } from "react-icons/hi";

import addNewWarrantyBill from "@/api/warranty/addNewWarrantyBill.api";
import {
    createFailToast,
    createSuccessToast,
} from "@/components/OperationStateToast/OperationStateToast";
import Link from "@/components/Typography/Link";
import { CustomerContext } from "@/contexts/CustomerContext";
import useLoading from "@/hooks/useLoading";
import WarrantyBill, { WarrantyProduct } from "@/types/entity/WarrantyBill";
import _ from "lodash";
import { useMutation } from "react-query";
import addNewCustomer from "@/api/customer/addNewCustomer.api";

const Page = () => {
    const [billProducts, setBillProducts] = useState<
        Map<string, WarrantyProduct>
    >(new Map<string, WarrantyProduct>());

    const { customer } = useContext(CustomerContext);

    const { openLoading, closeLoading } = useLoading();

    const addNewWarrantyBillMutation = useMutation(addNewWarrantyBill, {
        onMutate: () => {
            openLoading("Adding new warranty bill...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res: WarrantyBill<WarrantyProduct>, data) => {
            closeLoading();
            const link = `${window.location.origin}/warranty-invoice/${res.id}`;
            createSuccessToast(
                "Successfully",
                <>
                    You can view your bill here <Link href={link}>{link}</Link>
                </>,
            );
        },
        onError: (error: any, data) => {
            closeLoading();
            createFailToast("Fail to create bill", error.message, () =>
                addNewWarrantyBillMutation.mutate(data),
            );
        },
    });

    function getTotalInfo() {
        let quantity = 0;
        billProducts.forEach((product) => {
            quantity += 1 * product.quantity;
        });

        return { quantity };
    }

    async function getRequest() {
        let newCustomer;

        if (!customer?.id) {
            if (customer) {
                newCustomer = await addNewCustomer(customer);
            }
        }

        const warrantyProducts = Array.from(billProducts.values()).map(
            (product) => ({
                ..._.pick(product, ["warrantyContent", "quantity", "note"]),
                productId: product.id,
                id: product.id,
                status: "pending",
            }),
        );

        return {
            customerId: customer?.id || newCustomer?.id,
            warrantyProducts,
        };
    }

    async function onSubmit() {
        const request = await getRequest();
        addNewWarrantyBillMutation.mutate(request);
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
                    warrantyContent: {
                        title: "Reason",
                        type: "textarea",
                        size: 4,
                    },
                    note: {
                        title: "Note",
                        type: "textarea",
                        size: 2,
                    },
                }}
            />
            <div className=" mt-4 flex-none flex items-end w-full">
                <div className="flex-1 flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                        <p className=" text-secondary-950">
                            Total items:{"  "}
                            <span className=" text-lg font-semibold text-secondary-950">
                                {getTotalInfo().quantity}
                            </span>
                        </p>
                    </div>
                </div>
                <div className=" flex gap-5">
                    <Button btnType="secondary">Cancel</Button>
                    <Button className=" flex" onClick={() => onSubmit()}>
                        <HiCheck size={20} />
                        <p className=" ml-1">Submit</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Page;
