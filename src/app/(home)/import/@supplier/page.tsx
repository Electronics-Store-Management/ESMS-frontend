"use client";

import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import MenuButton from "@/components/SideBar/MenuButton";
import LabeledText from "@/components/Typography/LabeledText";
import { SupplierContext } from "@/contexts/SupplierContext";
import useScreen from "@/hooks/useScreen";
import { useContext } from "react";
import { HiLocationMarker, HiMail, HiPhone, HiUser } from "react-icons/hi";

export default function Page() {
    const { supplier, setSupplier } = useContext(SupplierContext);

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <div className="h-full mb-10 md:mb-0">
            <div className=" flex justify-between items-center">
                <p className="font-semibold text-color-heading text-2xl">
                    Supplier info
                </p>
                {isMobile && <MenuButton />}
            </div>
            <SearchInput
                title="Search for supplier"
                placeholder="Enter placeholder name here"
                queryInfo={{
                    queryKeys: ["suppliers"],
                    queryFunc: viewSupplierList,
                }}
                className="w-full mt-5"
                onSelect={(supplier) => setSupplier?.(supplier)}
            />
            {supplier ? (
                <div className=" p-5 mt-10 flex flex-col gap-3 border-[1px] rounded-2xl ">
                    <LabeledText
                        title="Name"
                        icon={HiUser}
                        value={supplier?.name}
                    />
                    <LabeledText
                        title="Email"
                        icon={HiMail}
                        value={supplier?.email}
                    />
                    <LabeledText
                        title="Phone number"
                        icon={HiPhone}
                        value={supplier?.phone}
                    />
                    <LabeledText
                        title="Address"
                        icon={HiLocationMarker}
                        value={supplier?.address}
                    />
                </div>
            ) : null}

            <br />
        </div>
    );
}
