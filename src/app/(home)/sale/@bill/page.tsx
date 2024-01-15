"use client";

import viewProductList from "@/api/product/viewProductList.api";
import BillProductTable from "@/components/BillProductTable/BillProductTable";
import Button from "@/components/Button/Button";
import ControllerSelectInput from "@/components/ControllerInput/ControllerSelectInput";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import ImportBill, { ImportProduct } from "@/types/entity/ImportBill";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { HiCheck } from "react-icons/hi";

import addNewSaleBill from "@/api/sale/addNewSaleBill.api";
import {
    createFailToast,
    createSuccessToast,
} from "@/components/OperationStateToast/OperationStateToast";
import Link from "@/components/Typography/Link";
import { CustomerContext } from "@/contexts/CustomerContext";
import useLoading from "@/hooks/useLoading";
import ProductPreview from "@/types/entity/ProductPreview";
import SaleBill, { SaleProduct } from "@/types/entity/SaleBill";
import FORMATTER from "@/utils/formatter";
import _ from "lodash";
import { useMutation } from "react-query";
import addNewCustomer from "@/api/customer/addNewCustomer.api";
import BillProductList from "@/components/BillProductList/BillProductList";
import useScreen from "@/hooks/useScreen";

const Page = () => {
    const [billProducts, setBillProducts] = useState<
        Map<string, ProductPreview>
    >(new Map<string, ProductPreview>());

    const { customer } = useContext(CustomerContext);

    const { openLoading, closeLoading } = useLoading();

    const addNewSaleBillMutation = useMutation(addNewSaleBill, {
        onMutate: () => {
            openLoading("Adding new sale bill...");
        },
        onSettled: () => {
            closeLoading();
        },
        onSuccess: (res: SaleBill<SaleProduct>, data) => {
            closeLoading();
            const link = `${window.location.origin}/sale-invoice/${res.id}`;
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
                addNewSaleBillMutation.mutate(data),
            );
        },
    });

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
    } = useForm<SaleBill<SaleProduct>>();

    async function getRequest() {
        let newCustomer;

        if (!customer?.id) {
            if (customer) {
                newCustomer = await addNewCustomer(customer);
            }
        }

        const saleProducts = Array.from(billProducts.values()).map(
            (product) => ({
                ..._.pick(product, ["price", "quantity"]),
                productId: product.id,
            }),
        );

        return {
            paymentMethod: getValues("paymentMethod"),
            customerId: customer?.id || newCustomer?.id,
            saleProducts,
        };
    }

    async function onSubmit() {
        const request = await getRequest();
        addNewSaleBillMutation.mutate(request);
    }

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <div className=" h-full col-span-2 flex flex-col lg:overflow-y-auto pl-2">
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
                className=" w-full lg:w-1/2 mt-5"
            />
            {isMobile ? (
                <BillProductList
                    data={billProducts}
                    onChange={(id, product) => {
                        billProducts.set(id, product);
                        setBillProducts(new Map(billProducts.entries()));
                    }}
                    onRemove={(id: string) => {
                        billProducts.delete(id);
                        setBillProducts(new Map(billProducts.entries()));
                    }}
                />
            ) : (
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
                                FORMATTER.toCurrency(price * quantity),
                        },
                    }}
                />
            )}
            <div className=" mt-4 flex-none flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-0 w-full">
                <div className="flex-1 flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                        <p className=" text-secondary-950">
                            Total items:{"  "}
                            <span className=" text-lg font-semibold text-secondary-950">
                                {getTotalInfo().quantity}
                            </span>
                        </p>
                        <p className=" text-secondary-950">
                            Total price:{"  "}
                            <span className=" text-lg font-semibold text-primary-500">
                                {FORMATTER.toCurrency(getTotalInfo().price)}
                            </span>
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
                <div className=" flex gap-5 justify-end sm:justify-normal">
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

const PAYMENT_METHOD = [
    { name: "Cash", id: "Cash" },
    { name: "Momo", id: "Momo" },
    { name: "Paypal", id: "Paypal" },
    { name: "Visa", id: "Visa" },
];

export default Page;
