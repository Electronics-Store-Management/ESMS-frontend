"use client";

import CustomerSelection from "@/components/CustomerSelection/CustomerSelection";
import TextInput from "@/components/Input/TextInput";
import LabeledText from "@/components/Typography/LabeledText";
import { CustomerContext } from "@/contexts/CustomerContext";
import Customer from "@/types/entity/Customer";
import { useContext, useState } from "react";
import { HiLocationMarker, HiPhone, HiUser } from "react-icons/hi";

export default function Page() {
    const { customer, setCustomer } = useContext(CustomerContext);

    const [isCreateCustomer, setIsCreateCustomer] = useState(false);

    return (
        <div className="h-full">
            <p className="font-semibold text-color-heading text-2xl">
                Customer info
            </p>
            <CustomerSelection
                className=" mt-[52px]"
                onSearch={(customer: Customer) => {
                    setCustomer?.(customer);
                    setIsCreateCustomer(false);
                    setCustomer?.({ ...customer, id: undefined });
                }}
                toggleCreating={(value, type) => {
                    setIsCreateCustomer(true);
                    if (type === "name")
                        setCustomer?.(
                            customer
                                ? { ...customer, name: value }
                                : { name: value },
                        );
                    else
                        setCustomer?.(
                            customer
                                ? { ...customer, phone: value }
                                : { phone: value },
                        );
                }}
            />
            {isCreateCustomer ? (
                <>
                    <p className=" mt-10 p-2 px-3 rounded-lg bg-primary-100 text-primary-700 font-medium">Will create new customer profile</p>
                    <div className=" mt-4 p-5 flex flex-col gap-3 border-[1px] rounded-2xl ">
                        <TextInput
                            title="Name"
                            icon={HiUser}
                            value={customer?.name}
                            onChange={(e) =>
                                setCustomer?.(
                                    customer
                                        ? { ...customer, name: e.target.value }
                                        : { name: e.target.value },
                                )
                            }
                        />
                        <TextInput
                            title="Phone number"
                            icon={HiPhone}
                            value={customer?.phone}
                            onChange={(e) =>
                                setCustomer?.(
                                    customer
                                        ? { ...customer, phone: e.target.value }
                                        : { phone: e.target.value },
                                )
                            }
                        />
                        <TextInput
                            title="Address"
                            icon={HiLocationMarker}
                            value={customer?.address}
                            onChange={(e) =>
                                setCustomer?.(
                                    customer
                                        ? {
                                              ...customer,
                                              address: e.target.value,
                                          }
                                        : { address: e.target.value },
                                )
                            }
                        />
                    </div>
                </>
            ) : customer ? (
                <div className=" p-5 mt-10 flex flex-col gap-3 border-[1px] rounded-2xl">
                    <LabeledText title="Name" value={customer?.name} />
                    <LabeledText title="Phone" value={customer?.phone} />
                    <LabeledText title="Address" value={customer?.address} />
                </div>
            ) : null}
            <br />
        </div>
    );
}