"use client";

import { useDeleteSupplierMutation } from "@/api/supplier/deleteSupplier.api";
import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import Button from "@/components/Button/Button";
import { useUpdateSupplierModal } from "@/components/UpdateSupplierForm/UpdateSupplierFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import Supplier from "@/types/entity/Supplier";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArchive } from "react-icons/lu";
import { RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";

export default function SupplierFunction({ id }: { id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { open: openUpdateSupplierModal } = useUpdateSupplierModal();

    const supplierKeyword = searchParams.get(SEARCH_PARAMS.supplierName) || "";

    const { refetch } = useQuery<Supplier[]>(
        ["suppliers", supplierKeyword],
        viewSupplierList,
        {
            retry: false,
        },
    );

    const deleteSupplierMutation = useDeleteSupplierMutation(refetch);

    return (
        <div className=" mt-5 pr-5 flex gap-5">
            <Button
                onClick={() => openUpdateSupplierModal(id, refetch)}
                className=" w-full flex"
            >
                <RiPencilLine size={20} />
                <p className=" ml-2">Edit</p>
            </Button>
            <Button
                onClick={() => {
                    deleteSupplierMutation.mutate(id);
                    router.replace("/supplier");
                }}
                btnType={"error"}
                className=" w-full flex"
            >
                <LuArchive size={20} />
                <p className=" ml-2">Delete</p>
            </Button>
        </div>
    );
}
