"use client";

import viewCustomerList from "@/api/customer/viewCustomerList.api";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import LabeledText from "@/components/Typography/LabeledText";
import { CustomerContext } from "@/contexts/CustomerContext";
import { useContext } from "react";
import { HiLocationMarker, HiPhone, HiUser } from "react-icons/hi";

export default function Page() {
    const { customer, setCustomer } = useContext(CustomerContext);

    return (
        <div className="h-full">
            <p className="font-semibold text-color-heading text-2xl">
                Customer info
            </p>
            <SearchInput
                title="Search for customer"
                placeholder="Enter customer name here..."
                queryInfo={{
                    queryKeys: ["customers"],
                    queryFunc: viewCustomerList,
                }}
                className="w-full mt-5"
                onSelect={(customer) => setCustomer?.(customer)}
            />
            {customer ? (
                <div className=" p-5 mt-10 flex flex-col gap-3 border-[1px] rounded-2xl ">
                    <LabeledText
                        title="Name"
                        icon={HiUser}
                        value={customer?.name}
                    />
                    <LabeledText
                        title="Phone number"
                        icon={HiPhone}
                        value={customer?.phone}
                    />
                    <LabeledText
                        title="Address"
                        icon={HiLocationMarker}
                        value={customer?.address}
                    />
                </div>
            ) : null}

            <br />
        </div>
    );
}
