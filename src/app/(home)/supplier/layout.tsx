"use client";

import { HiOutlineSearch, HiPlus } from "react-icons/hi";

import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import Button from "@/components/Button/Button";
import { useCreateSupplierModal } from "@/components/CreateSupplierForm/CreateSupplierFormModal";
import FilterBadge from "@/components/FilterBadge/FilterBadge";
import TextInput from "@/components/Input/TextInput";
import MobileHeader from "@/components/MobileHeader/MobileHeader";
import SEARCH_PARAMS from "@/constants/searchParams";
import { usePermission } from "@/hooks/usePermission";
import useScreen from "@/hooks/useScreen";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import Supplier from "@/types/entity/Supplier";
import withQuery from "@/utils/withQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useQuery } from "react-query";
import SupplierList from "./SupplierList";

export default function Layout({ children }: ReactNodeChildren) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchRef = useRef<HTMLInputElement>(null);
    const supplierKeyword = searchParams.get(SEARCH_PARAMS.supplierName) || "";

    const { open: openCreateSupplierModal } = useCreateSupplierModal();

    const { refetch } = useQuery<Supplier[]>(
        ["suppliers", supplierKeyword],
        viewSupplierList,
        {
            retry: false,
        },
    );

    const isAllowedCreate = usePermission("SUPPLIER", ["CREATE"]);

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <div className="w-full h-full flex flex-col">
            <MobileHeader title="Supplier" />
            <div className=" w-full flex gap-5">
                <TextInput
                    ref={searchRef}
                    className=" w-full max-w-96"
                    defaultValue={
                        searchParams.get(SEARCH_PARAMS.supplierName) || ""
                    }
                    rightAddon={<HiOutlineSearch />}
                    onRightAddonClick={() =>
                        router.push(
                            withQuery("/supplier", {
                                [SEARCH_PARAMS.supplierName]:
                                    searchRef?.current?.value,
                            }),
                        )
                    }
                    placeholder="Search supplier by name here..."
                />
                <div className=" flex-none flex justify-end place-items-stretch col-span-2 sm:col-span-3 lg:col-span-3 col-start-12 sm:col-start-10 lg:col-start-10 row-start-1 ">
                    {isAllowedCreate ? (
                        <Button
                            size="sm"
                            onClick={() => openCreateSupplierModal(refetch)}
                            className=" place-items-stretch col-span-1 sm:col-span-2 col-start-6 sm:col-start-5 row-start-1 "
                        >
                            <div className="flex items-center gap-2">
                                <HiPlus className=" w-4 h-4" />
                                {!isMobile ? <p>New supplier</p> : null}
                            </div>
                        </Button>
                    ) : null}
                </div>
            </div>
            <div className=" flex gap-5 mt-5">
                <FilterBadge
                    title="Supplier name"
                    type="search"
                    searchParamName={SEARCH_PARAMS.supplierName}
                />
            </div>
            <div className=" w-full flex-1 overflow-auto flex gap-5">
                {/* <SupplierList /> */}
                {children}
            </div>
        </div>
    );
}
