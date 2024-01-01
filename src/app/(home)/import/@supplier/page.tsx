"use client";

import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import TextInput from "@/components/Input/TextInput";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import Supplier from "@/types/entity/Supplier";
import { useState } from "react";
import { HiLocationMarker, HiMail, HiPhone, HiUser } from "react-icons/hi";

export default function Page() {
    const [supplier, setSupplier] = useState<Supplier>();

    return (
        <div className="h-full">
            <p className="font-semibold text-color-heading text-2xl">
                Supplier info
            </p>
            <SearchInput
                title="Search for supplier"
                placeholder="Enter placeholder name here"
                queryInfo={{
                    queryKeys: ["suppliers"],
                    queryFunc: viewSupplierList,
                }}
                className="w-full mt-5"
                onSelect={(supplier) => setSupplier(supplier)}
            />
            {supplier ? (
                <div className=" p-5 mt-10 flex flex-col gap-3 border-[1px] rounded-2xl ">
                    <TextInput
                        title="Name"
                        icon={HiUser}
                        value={supplier?.name}
                        readOnly
                    />
                    <TextInput
                        title="Email"
                        icon={HiMail}
                        value={supplier?.email}
                        readOnly
                    />
                    <TextInput
                        title="Phone number"
                        icon={HiPhone}
                        value={supplier?.phone}
                        readOnly
                    />
                    <TextInput
                        title="Address"
                        icon={HiLocationMarker}
                        value={supplier?.address}
                        readOnly
                    />
                </div>
            ) : null}

            <br />
        </div>
    );
}
